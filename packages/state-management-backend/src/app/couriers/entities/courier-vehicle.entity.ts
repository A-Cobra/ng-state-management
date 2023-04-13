import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class CourierVehicle {
  @PrimaryKey()
  idVehicle: string = v4();

  @Property({ type: 'string', length: 25 })
  vehicleType: string;

  @Property({ type: 'string', length: 120 })
  description: string;
}
