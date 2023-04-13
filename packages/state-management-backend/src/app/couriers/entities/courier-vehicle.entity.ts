import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class CourierVehicle {
  @PrimaryKey()
  vehicleId: string = v4();

  @Property()
  vehicleType: string;

  @Property()
  description: string;
}
