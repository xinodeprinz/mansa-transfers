import { Transform } from 'class-transformer';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Transform(({ value }) => value?.trim())
  first_name: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  last_name: string;

  @IsEmail()
  @Transform(({ value }) => value?.trim())
  email: string;

  @IsPhoneNumber('CM')
  @Transform(({ value }) => value?.trim())
  phone: string;

  @MinLength(5)
  @IsString()
  password: string;
}
