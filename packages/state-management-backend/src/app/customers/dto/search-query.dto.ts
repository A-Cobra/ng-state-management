import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPort, IsPositive } from 'class-validator';

export class SearchQueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  page: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsPositive()
  limit: number;
}
