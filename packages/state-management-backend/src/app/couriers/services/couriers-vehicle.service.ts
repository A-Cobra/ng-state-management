import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Courier } from '../entities/courier.entity';
import { CreateCourierVehicleDto } from '../dto/create-courier-vehicle';
import { CouriersService } from './couriers.service';
import { JwtInfo } from '../../auth/interfaces/jwtinfo.type';
import { UpdateCourierVehicleDto } from '../dto/update-courier-vehicle';
import { CourierVehicle } from '../entities/courier-vehicle.entity';

@Injectable()
export class CouriersVehicleService {
  constructor(
    @InjectRepository(Courier)
    private readonly courierRepository: EntityRepository<Courier>,
    @InjectRepository(CourierVehicle)
    private readonly vehicleRepository: EntityRepository<CourierVehicle>,
    private readonly couriersService: CouriersService
  ) {}

  async create(
    createCourierVehicleDto: CreateCourierVehicleDto,
    user: JwtInfo
  ) {
    const courier = await this.couriersService.findById(user.sub);

    if (courier.vehicle) {
      throw new BadRequestException(
        'User Already has a vehicle. Proceed to edit Your vehicle'
      );
    }

    this.courierRepository.assign(courier, {
      vehicle: { ...createCourierVehicleDto },
    });
    await this.courierRepository.flush();
    return { message: 'Vehicle added successfully' };
  }

  async update(
    updateCourierVehicleDto: UpdateCourierVehicleDto,
    user: JwtInfo
  ) {
    const courier = await this.courierRepository.findOne(
      { userId: user.sub },
      { populate: ['vehicle'] }
    );

    if (!courier.vehicle) {
      throw new BadRequestException(
        'User has no registered vehicles, please register one'
      );
    }

    const vehicle = courier.vehicle;
    this.vehicleRepository.assign(vehicle, updateCourierVehicleDto);
    await this.vehicleRepository.flush();
    return { message: 'Vehicle Updated successfully' };
  }
}
