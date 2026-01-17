import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { SignUpDto, UniqueCheckDto } from './auth.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignUpDto) {
    // Ensure uniqueness of necessary fields
    const uniqueFields = ['email', 'phone'];
    for await (const field of uniqueFields) {
      const row = await this.prisma.user.findFirst({
        where: { [field]: dto[field] },
      });

      if (row) throw new BadRequestException(`The ${field} already exists`);
    }

    // Hash password
    const salt = await bcrypt.genSalt();
    dto.password = await bcrypt.hash(dto.password, salt);

    // Store information in the database
    const user = await this.prisma.user.create({ data: dto });
    return user;
  }

  async uniqueCheck(dto: UniqueCheckDto) {
    const key = dto.email ? 'email' : 'phone';
    const exists = await this.prisma.user.findFirst({
      where: { [key]: dto[key] },
    });

    if (exists) throw new BadRequestException(`The ${key} already exists`);
    return { ok: true };
  }
}
