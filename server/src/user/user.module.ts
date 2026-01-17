import { Module } from '@nestjs/common';
import { UserService } from './user.service.js';
import { UserController } from './user.controller.js';
import { PrismaService } from '../prisma.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [AuthModule],
})
export class UserModule {}
