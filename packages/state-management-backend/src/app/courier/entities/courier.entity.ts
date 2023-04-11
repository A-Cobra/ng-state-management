import { Entity, OneToOne, Property } from '@mikro-orm/core';
import { v4 } from 'uuid';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Courier extends User {
  @Property()
  status: boolean;

  @Property()
  driversLicense: string;

  @OneToOne()
  payrollIdPayroll: string;

  @OneToOne()
  vehicleIdVehicle: string;

  @Property()
  userIdRole: string;

  @OneToOne()
  userIdUser: string;
}
