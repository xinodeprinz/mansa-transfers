import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import nodemailer, { Transporter } from 'nodemailer';
import type { SendInVoiceOptions } from './dtos/interface.js';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class EmailService {
  private transporter: Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: this.configService.get<number>('MAIL_PORT'),
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASSWORD'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  }

  @OnEvent('send.invoice')
  async sendInvoiceEmail(opts: SendInVoiceOptions) {
    const from = this.configService.get('MAIL_SENDER');
    const url = this.configService.get('APP_URL');
    const html = this.getInvoiceHTML(opts);

    await this.transporter.sendMail({
      from: `Mansa Transfers <${from}>`,
      to: opts.to,
      subject: opts.subject,
      html,
      attachments: [
        {
          filename: `receipt-${opts.reference}.pdf`,
          path: `${url}/receipts/${opts.reference}`,
          contentType: 'application/pdf',
        },
      ],
    });
  }

  private getInvoiceHTML(opts: SendInVoiceOptions) {
    return `
        <p>Hi ${opts.name},</p>
        <p>Thanks for your payment. Your receipt is attached.</p>
        <p><b>Reference:</b> ${opts.reference}</p>
        <p>— Mansa Transfers</p>
      `;
  }
}
