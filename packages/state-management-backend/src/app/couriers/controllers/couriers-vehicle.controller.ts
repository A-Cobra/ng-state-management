import { Body, Controller, Patch, Post } from '@nestjs/common';
import { CreateCourierVehicleDto } from '../dto/create-courier-vehicle';
import { GetUser } from '../../auth/decorator/get-user.decorator';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { CouriersVehicleService } from '../services/couriers-vehicle.service';
import { Authorized } from '../../auth/decorator/authorized.decorator';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { UpdateCourierVehicleDto } from '../dto/update-courier-vehicle';

@Controller('couriers-vehicle')
export class CouriersVehicleController {
  constructor(
    private readonly couriersVehicleService: CouriersVehicleService
  ) {}

  @Post()
  @Authorized(ValidRoles.courier)
  create(
    @Body() createCourierVehicleDto: CreateCourierVehicleDto,
    @GetUser() courier: JwtInfo
  ) {
    return this.couriersVehicleService.create(createCourierVehicleDto, courier);
  }

  @Patch()
  @Authorized(ValidRoles.courier)
  update(
    @Body() updateCourierVehicleDto: UpdateCourierVehicleDto,
    @GetUser() courier: JwtInfo
  ) {
    return this.couriersVehicleService.update(updateCourierVehicleDto, courier);
  }
}
