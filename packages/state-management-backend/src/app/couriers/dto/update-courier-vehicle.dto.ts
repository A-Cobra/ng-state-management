import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { CreateCourierVehicleDto } from './create-courier-vehicle.dto';

export class UpdateCourierVehicleDto extends PartialType(
  CreateCourierVehicleDto
) {}
