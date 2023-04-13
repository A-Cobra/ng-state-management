import { Module } from '@nestjs/common';
import { CouriersService } from './services/couriers.service';
import { CouriersController } from './controllers/couriers.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Courier } from './entities/courier.entity';
import { UsersModule } from '../users/users.module';
import { CourierVehicle } from './entities/courier-vehicle.entity';
import { CouriersVehicleController } from './controllers/couriers-vehicle.controller';
import { CouriersVehicleService } from './services/couriers-vehicle.service';

@Module({
  imports: [MikroOrmModule.forFeature([Courier, CourierVehicle]), UsersModule],
  controllers: [CouriersController, CouriersVehicleController],
  providers: [CouriersService, CouriersVehicleService],
})
export class CouriersModule {}
