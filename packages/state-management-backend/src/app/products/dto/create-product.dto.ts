import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  productName: string;
  @IsString()
  description: string;
  @IsNumber()
  price: number;
  @IsNumber()
  discount: number;
  @IsNumber()
  stock: number;
  @IsString()
  status: string;
}
