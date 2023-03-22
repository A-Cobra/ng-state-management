import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  productId?: string;

  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  comment: string;
}
