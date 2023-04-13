import {
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { Payroll } from '../../payroll/entities/payroll.entity';
import { User } from '../../users/entities/user.entity';
import { Vehicle } from '../../vehicle/entities/vehicle.entity';
import { v4 } from 'uuid';
import { Role } from '../../roles/entities/role.entity';
import { CourierVehicle } from './courier-vehicle.entity';

@Entity()
export class Courier extends User {
  @PrimaryKey()
  idCourier: string = v4();

  @Property()
  status: boolean;

  @Property({ type: 'string', length: 50 })
  driversLicense: string;

  @OneToOne(() => Payroll, (payroll) => payroll.idPayroll)
  payroll: Payroll;

  @OneToOne(() => User, (user) => user.userId)
  user: User;

  @OneToOne(() => Vehicle, (vehicle) => vehicle.idVehicle)
  vehicle: CourierVehicle;

  @ManyToOne(() => Role)
  role: Role;
}
