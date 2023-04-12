import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCourierVehicleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(25)
  vehicleType: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(125)
  description: string;
}
