import { Injectable, NotFoundException } from '@nestjs/common';
import { BusinessHq } from '../../business/entities/business.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { ValidRoles } from '../../auth/interfaces/valid-roles.type';
import { User } from '../entities/user.entity';
import { BusinessService } from '../../business/services/business.service';
import { CustomersService } from '../../customers/services/customers.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly businessService: BusinessService,
    private readonly customerService: CustomersService
  ) {}

  async findUser(userId: string, role: string): Promise<User> {
    switch (role) {
      case ValidRoles.business:
        return this.businessService.findById(userId);
      case ValidRoles.customer:
        return this.customerService.findById(userId);
      default:
        throw new NotFoundException();
    }
  }
}
