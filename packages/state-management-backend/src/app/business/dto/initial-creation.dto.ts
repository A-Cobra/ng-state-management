import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class InitialBusinessCreationDto {

    @ApiProperty()
    @IsString()
    businessName: string;

    @ApiProperty()
    @IsString()
    representativeName: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    latitude: string;

    @ApiProperty()
    @IsString()
    longitude: string;

    @ApiProperty()
    @IsString()
    contactNumber: string;
}