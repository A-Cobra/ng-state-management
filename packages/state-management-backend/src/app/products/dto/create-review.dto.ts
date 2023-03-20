import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  productId: string;

  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  comment: string;
}
