import { IsBoolean, IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';

export class BusinessOrdersAnalyticsDto extends PaginationDto {
  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsOptional()
  @IsBoolean()
  sortAsc?: boolean = true;

  @IsOptional()
  @IsDate()
  startTime?: Date;

  @IsOptional()
  @IsDate()
  endTime?: Date = new Date();
}
