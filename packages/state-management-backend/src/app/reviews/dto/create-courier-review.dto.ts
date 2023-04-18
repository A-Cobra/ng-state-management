import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourierReviewDto {
  courierId?: string;

  @IsNotEmpty()
  @IsString()
  customerId: string;

  @IsNotEmpty()
  @IsString()
  comment: string;
}
