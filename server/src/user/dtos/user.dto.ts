import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';
import type { Request } from 'express';

export class CreateProductDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  description: string;

  @Min(100)
  @IsPositive()
  @Transform(({ value }) => Number(value))
  price: number;

  @IsPositive()
  @IsOptional()
  quantity: number;
}

export class PurchaseProductDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  name: string;

  @IsEmail()
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsPhoneNumber('CM')
  @Transform(({ value }) => value?.trim())
  phone: string;
}
