import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service.js';
import { LoginDto, SignUpDto, UniqueCheckDto } from './auth.dto.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

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

    // Generate JWT token
    const token = await this.jwtService.signAsync({ sub: user.id });

    // Send response
    return {
      message: 'Account created',
      token,
    };
  }

  async uniqueCheck(dto: UniqueCheckDto) {
    const key = dto.email ? 'email' : 'phone';
    const exists = await this.prisma.user.findFirst({
      where: { [key]: dto[key] },
    });

    if (exists) throw new BadRequestException(`The ${key} already exists`);
    return { ok: true };
  }

  async login({ email, password }: LoginDto) {
    const error = 'Invalid login credentials';

    // Check if a user exists with the email
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) throw new BadRequestException(error);

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new BadRequestException(error);

    // Generate JWT token
    const token = await this.jwtService.signAsync({ sub: user.id });

    // Send response
    return {
      message: 'Login successful',
      token,
    };
  }
}
