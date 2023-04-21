import { IsDate, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BusinessSalesAnalyticsDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  searchValue?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  businessId?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  category?: string;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  startTime?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  endTime?: Date = new Date();
}
