import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { CreateProductDto } from './user.dto.js';
import { randomUUID } from 'crypto';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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
}
