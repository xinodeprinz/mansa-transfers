import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';

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

export class UniqueCheckDto {
  @IsPhoneNumber('CM')
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  phone?: string;

  @IsEmail()
  @Transform(({ value }) => value?.trim())
  @IsOptional()
  email?: string;

  @ValidateIf((o) => (!o.phone && !o.email) || (o.phone && o.email))
  @IsDefined({ message: 'Provide either an email or phone number' })
  protected readonly combinedCheck: undefined;
}
