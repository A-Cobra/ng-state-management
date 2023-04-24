import { IsBoolean, IsDate, IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../common/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';

export class BusinessOrdersAnalyticsDto extends PaginationDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  searchValue?: string;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  sortAsc?: boolean = true;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  startTime?: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  endTime?: Date = new Date();
}
