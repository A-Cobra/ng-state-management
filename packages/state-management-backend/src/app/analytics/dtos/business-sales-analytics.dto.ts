import { IsDate, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class BusinessSalesAnalyticsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsOptional()
  @IsString()
  businessId?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date = new Date();
}
