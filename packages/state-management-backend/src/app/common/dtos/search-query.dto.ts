import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  page?: number;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsOptional()
  @IsPositive()
  @IsInt()
  limit?: number;
}
