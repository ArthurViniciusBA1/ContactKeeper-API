import { hashSync } from 'bcryptjs';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  IsPhoneNumber,
  MinLength,
} from 'class-validator';
import { IsSecurePassword } from 'src/custom-validators/isSecurePassword.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('BR', { message: 'Invalid phone number' })
  telephone: string;

  @MinLength(8)
  @IsNotEmpty()
  @IsString()
  @IsSecurePassword()
  @Transform(({ value }: { value: string }) => hashSync(value, 10), {
    groups: ['transform'],
  })
  password: string;
}
