import { IsEmail, IsString } from "class-validator";
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

  openingTime: Date;

  closeTime: Date;

  @IsString()
  @IsEmail()
  contactEmail: string;

  @IsString()
  contactPhoneNumber: string;

  @IsString()
  businessId: Business_HQ;
}
