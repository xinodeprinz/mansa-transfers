import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { LoginDto, SignUpDto, UniqueCheckDto } from './auth.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    return this.service.signup(dto);
  }

  // Used to check if email or phone number is unique
  @Post('unique/check')
  uniqueCheck(@Body() dto: UniqueCheckDto) {
    return this.service.uniqueCheck(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.service.login(dto);
  }
}
