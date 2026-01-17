import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateProductDto, PurchaseProductDto } from './dtos/user.dto.js';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';
import axios, { AxiosInstance } from 'axios';
import { ConfigService } from '@nestjs/config';
import { MansaAuthenticate } from './dtos/interface.js';
import { NETWORK_CARRIERS, ONLY_9_DIGITS_RE } from '../utils/carriers.js';
import { Decimal } from '@prisma/client/runtime/client';
import PDFDocument from 'pdfkit';
import type { Response } from 'express';
import { PassThrough } from 'stream';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  private api: AxiosInstance;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private eventEmitter: EventEmitter2,
  ) {
    this.api = axios.create({
      baseURL: this.configService.get('MANSA_BASE_URL'),
      headers: {
        'client-key': this.configService.get('MANSA_CLIENT'),
        'client-secret': this.configService.get('MANSA_SECRET'),
      },
    });
  }

  async createProduct(
    dto: CreateProductDto,
    image: Express.Multer.File,
    userId: string,
  ) {
    // Ensure uniqueness of product title
    const product = await this.prisma.product.findUnique({
      where: { title: dto.title },
    });

    if (product) {
      throw new BadRequestException(
        `The product with title '${product.title}' already exists`,
      );
    }

    const imagePath = this.storeImage(image);
    await this.prisma.product.create({
      data: {
        ...dto,
        image: imagePath,
        user_id: userId,
      },
    });

    return { message: 'Product created' };
  }

  private storeImage(image: Express.Multer.File, folder = 'products') {
    // Save image in the public/uploads dir
    const ext = image.originalname.split('.').pop();
    const filename = `${randomUUID()}.${ext}`;
    const productsDir = path.join(process.cwd(), 'public', folder);
    const filepath = path.join(productsDir, filename);

    // Ensure directory exists
    fs.mkdirSync(productsDir, { recursive: true });

    // Write file
    fs.writeFileSync(filepath, image.buffer);

    // Return image's path
    return `${folder}/${filename}`;
  }

  async getProducts(user_id: string) {
    return this.prisma.product.findMany({
      where: { user_id },
      omit: { user_id: true },
    });
  }

  async getProfile(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      omit: { password: true },
    });
  }

  async getProductById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      omit: { user_id: true },
      include: { user: { omit: { password: true } } },
    });

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async purchaseProduct(id: string, dto: PurchaseProductDto) {
    const product = await this.getProductById(id);
    const reference = await this.makeMansaPayment(dto, product.price);

    // Payment is successful; store payment in database.
    await this.prisma.payment.create({
      data: {
        id: reference,
        product_id: product.id,
        ...dto,
      },
    });

    // Decrement the quantity if available
    if (product.quantity && product.quantity > 0) {
      await this.prisma.product.update({
        where: { id: product.id },
        data: { quantity: { decrement: 1 } },
      });
    }

    // Send payment invoice by email
    this.eventEmitter.emit('send.invoice', {
      reference,
      to: dto.email,
      name: dto.name,
      subject: `Your receipt - ${reference}`,
    });

    return { message: 'Payment successful' };
  }

  private async authenticate() {
    const res = await this.api.post<MansaAuthenticate>('/authenticate');
    return res.data.data.accessToken;
  }

  private async initialize(dto: PurchaseProductDto, price: Decimal) {
    const token = await this.authenticate();
    const reference = randomUUID();

    await this.api.post(
      '/initiate',
      {
        paymentMode: this.detectCarrier(dto.phone),
        phoneNumber: dto.phone,
        transactionType: 'payin',
        amount: Number(price),
        fullName: dto.name,
        emailAddress: dto.email,
        currencyCode: 'XAF',
        countryCode: 'CM',
        externalReference: reference,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );

    return { reference, token };
  }

  private async makeMansaPayment(dto: PurchaseProductDto, price: Decimal) {
    try {
      const { reference, token } = await this.initialize(dto, price);
      await this.api.get('/check-status', {
        params: { reference },
        headers: { Authorization: `Bearer ${token}` },
      });

      return reference;
    } catch (error) {
      console.log(
        '=== An error occurred while processing Mansa Payment ===',
        error,
      );
      throw new BadRequestException('Payment failed! Please try again.');
    }
  }

  private detectCarrier(phone: string) {
    if (!ONLY_9_DIGITS_RE.test(phone)) return null;
    const p3 = phone.slice(0, 3);
    if (NETWORK_CARRIERS.MTN.includes(p3)) return 'MOMO';
    if (NETWORK_CARRIERS.ORANGE.includes(p3)) return 'OM';
    return null;
  }

  async downloadReceipt(paymentId: string, res: Response) {
    const payment = await this.prisma.payment.findUnique({
      where: { id: paymentId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        created_at: true,
        product: {
          select: {
            title: true,
            description: true,
            price: true,
            user: { select: { first_name: true, last_name: true } },
          },
        },
      },
    });

    if (!payment) throw new NotFoundException('Payment not found');

    const doc = new PDFDocument({ size: 'A4', margin: 50 });
    const stream = new PassThrough();
    doc.pipe(stream);

    // --- PDF content ---
    doc.fontSize(20).text('Payment Receipt', { align: 'center' });
    doc.moveDown(1);

    doc.fontSize(12);
    doc.text(
      `Merchant: ${payment.product.user.first_name} ${payment.product.user.last_name}`,
    );
    doc.text(
      `Date of payment: ${new Date(payment.created_at).toLocaleString()}`,
    );
    doc.text(`Payment reference: ${payment.id}`);
    doc.moveDown(0.8);

    doc.fontSize(14).text('Product', { underline: true });
    doc.fontSize(12).text(`Title: ${payment.product.title}`);
    doc.text(`Description: ${payment.product.description ?? 'N/A'}`);
    doc.text(`Amount paid: ${payment.product.price} XAF`);
    doc.moveDown(0.8);

    doc.fontSize(14).text('Customer', { underline: true });
    doc.fontSize(12).text(`Name: ${payment.name}`);
    doc.text(`Email: ${payment.email}`);

    doc.moveDown(2);
    doc
      .fontSize(10)
      .fillColor('#666')
      .text('Thank you for your purchase.', { align: 'center' });

    doc.end();

    const filename = `receipt-${payment.id}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);

    // Stream PDF to response
    stream.pipe(res);
  }
}
