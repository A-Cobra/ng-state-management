import { IsDate, IsEmail, IsString } from "class-validator";
import { Business_HQ } from "../../business/entities/business.entity";

export class CreateBranchDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  longitude: string;

  @IsString()
  latitude: string;

  @IsDate()
  openingTime: Date;

  @IsDate()
  closeTime: Date;

  @IsString()
  @IsEmail()
  contactEmail: string;

  @IsString()
  contactPhoneNumber: string;

  @IsString()
  businessId: Business_HQ;
}
