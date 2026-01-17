import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module.js';
import { UserModule } from './user/user.module.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule],
})
export class AppModule {}
