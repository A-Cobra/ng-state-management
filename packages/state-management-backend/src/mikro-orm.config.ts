import { Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { User } from './app/users/entities/user.entity';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { BusinessHq } from './app/business/entities/business.entity';
import { BusinessClassification } from './app/business/entities/business-classification.entity';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { BusinessBranch } from './app/branches/entities/businessBranch.entity';
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

dotenvExpand.expand(dotenv.config());

const configService = new ConfigService();

const logger = new Logger('MikroORM');

const MikroOrmConfig: Options = {
  debug: true,
  logger: logger.log.bind(logger),
  type: 'postgresql',
  clientUrl: configService.get('DATABASE_URL'),
  entities: [
    User,
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
  ],
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    path: './database/migrations',
  },
};

export default MikroOrmConfig;
