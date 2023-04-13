import { Collection, Entity, OneToOne, Property } from '@mikro-orm/core';
import { Payroll } from '../../payroll/entities/payroll.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Courier extends User {
  @Property()
  status: boolean;

  @Property()
  driversLicense: string;

  @OneToOne(() => Payroll, (payroll) => payroll.idPayroll)
  payroll = new Collection<Payroll>(this);

  @OneToOne()
  vehicleIdVehicle: string;

  @Property()
  userIdRole: string;

  @OneToOne()
  userIdUser: string;
}
