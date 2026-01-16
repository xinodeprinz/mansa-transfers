import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signup() {
    return this.prismaService.user.findMany();
  }
}
