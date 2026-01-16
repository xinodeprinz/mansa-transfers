import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service.js';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  async getHello() {
    return this.prisma.user.findMany();
  }
}
