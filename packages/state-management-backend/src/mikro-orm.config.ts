import { Options } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { User } from './app/users/entities/user.entity';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { BusinessHq } from './app/business/entities/business.entity';
import { BusinessClassification } from './app/business/entities/business-classification.entity';
import { BusinessBranch } from './app/branches/entities/business-branch.entity';
import { Product } from './app/products/entities/product.entity';
import { ProductReview } from './app/reviews/entities/product-review.entity';
import { Review } from './app/reviews/entities/review.entity';
import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { Role } from './app/users/entities/role.entity';
import { UserCredentials } from './app/users/entities/user-credentials.entity';
import { Customer } from './app/customers/entities/customer.entity';
import { Courier } from './app/couriers/entities/courier.entity';
import { CourierVehicle } from './app/couriers/entities/courier-vehicle.entity';
import { AccountType } from './app/account/entities/account-type.entity';
import { Address } from './app/address/entities/address.entity';
import { OrderStatus } from './app/orders/entities/order-status.entity';
import { Order } from './app/orders/entities/order.entity';
import { Payment } from './app/payment/entities/payment.entity';
import { Payroll } from './app/payroll/entities/payroll.entity';
import { ProductClassification } from './app/products/entities/product.classification';
import { CourierReview } from './app/reviews/entities/courier-review.entity';

dotenvExpand.expand(dotenv.config());

const configService = new ConfigService();

const logger = new Logger('MikroORM');

const MikroOrmConfig: Options = {
  debug: true,
  logger: logger.log.bind(logger),
  type: 'postgresql',
  clientUrl: configService.get('DATABASE_URL'),
  entities: [
    BusinessHq,
    BusinessClassification,
    Review,
    ProductReview,
    Product,
    BusinessBranch,
    UserCredentials,
    Role,
    Customer,
    Courier,
    CourierVehicle,
    AccountType,
    Address,
    OrderStatus,
    Order,
    Payment,
    Payroll,
    ProductClassification,
    CourierReview,
    User,
  ],
  migrations: {
    path: './database/migrations',
  },
};

export default MikroOrmConfig;
