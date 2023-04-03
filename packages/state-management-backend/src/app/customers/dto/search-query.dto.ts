import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsPositive } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  limit?: number;
}
