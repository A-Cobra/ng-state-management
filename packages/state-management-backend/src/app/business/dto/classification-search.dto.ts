import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class classificationSearchDto {
  @ApiProperty({ type: [String] })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty()
  @IsPositive()
  page: number;

  @ApiProperty()
  @IsPositive()
  pageSize: number;
}
