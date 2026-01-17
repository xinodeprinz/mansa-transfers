import { Transform } from 'class-transformer';
import { IsOptional, IsPositive, IsString, Min } from 'class-validator';
import type { Request } from 'express';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  description: string;

  @IsPositive()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsPositive()
  @IsOptional()
  quantity: number;
}

export interface UserRequest extends Request {
  user: { sub: string };
}
