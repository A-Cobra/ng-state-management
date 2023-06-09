import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Payroll } from '../../payroll/entities/payroll.entity';
import { User } from '../../users/entities/user.entity';
import { v4 } from 'uuid';
import { CourierVehicle } from './courier-vehicle.entity';
import { Role } from '../../users/entities/role.entity';

@Entity()
export class Courier extends User {
  @PrimaryKey()
  courierId: string = v4();

  @Property()
  status: boolean;

  @Property({ type: 'string', length: 50 })
  driversLicense: string;

  @OneToOne(() => Payroll)
  payroll: Payroll;

  @OneToOne(() => User)
  user: User;

  @OneToOne(() => CourierVehicle)
  vehicle: CourierVehicle;

  @ManyToOne(() => Role)
  role: Role;
}
