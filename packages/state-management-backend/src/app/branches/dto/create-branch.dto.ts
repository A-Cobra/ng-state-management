import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  image: string;

  @ApiProperty()
  @IsString()
  longitude: string;

  @ApiProperty()
  @IsString()
  latitude: string;

  @ApiProperty()
  @IsString()
  openingTime: string;

  @ApiProperty()
  @IsString()
  closeTime: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  contactEmail: string;

  @ApiProperty()
  @IsString()
  contactPhoneNumber: string;
}
