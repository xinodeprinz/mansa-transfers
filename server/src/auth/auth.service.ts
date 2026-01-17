import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { SignUpDto } from './auth.dto.js';
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
}
