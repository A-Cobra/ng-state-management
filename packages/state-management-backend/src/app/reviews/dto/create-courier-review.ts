import { IsNotEmpty } from 'class-validator';

export class CreateCourierReviewDto {
  courierId?: string;

  @IsNotEmpty()
  customerId: string;

  @IsNotEmpty()
  comment: string;
}
