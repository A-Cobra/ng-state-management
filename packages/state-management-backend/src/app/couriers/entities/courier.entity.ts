import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { CourierVehicle } from './courier-vehicle.entity';

@Entity()
export class Courier extends User {
  @Property({ default: 'offline' })
  status: string;

  @Property()
  driversLicense: string;

  @OneToOne({ nullable: true })
  vehicle: CourierVehicle;
}
