import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CompleteBusinessCreationDTO {
  @ApiProperty()
  @IsString()
  businessPicture: string;

  @ApiProperty()
  @IsString()
  password: string;
}
