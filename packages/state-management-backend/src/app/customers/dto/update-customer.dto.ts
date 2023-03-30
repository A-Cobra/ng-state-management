import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsEmpty({ message: 'Cant update Password' })
  password?: string;

  @IsEmpty({ message: 'cant update email' })
  email?: string;

  @IsEmpty({ message: 'To change role please contact an admin' })
  role: string;
}
