import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  picture: string;

  @IsString()
  @IsNotEmpty()
  lastname: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(5)
  username: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsPhoneNumber()
  contact_number: number;
}
