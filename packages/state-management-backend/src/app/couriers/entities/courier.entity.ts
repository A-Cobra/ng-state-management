import { Entity, OneToOne, PrimaryKey, Property } from '@mikro-orm/core';
import { User } from '../../users/entities/user.entity';
import { v4 } from 'uuid';
import { CourierVehicle } from './courier-vehicle.entity';

@Entity()
export class Courier extends User {
  @PrimaryKey({ hidden: true })
  courierId: string = v4();

  @Property({ default: 'offline' })
  status: string;

  @Property()
  driversLicense: string;

  @OneToOne({ nullable: true })
  vehicle: CourierVehicle;
}
