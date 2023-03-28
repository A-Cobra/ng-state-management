import { IsEmail, IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  image: string;

  @IsString()
  longitude: string;

  @IsString()
  latitude: string;

  @IsString()
  openingTime: string;

  @IsString()
  closeTime: string;

  @IsString()
  @IsEmail()
  contactEmail: string;

  @IsString()
  contactPhoneNumber: string;
}
