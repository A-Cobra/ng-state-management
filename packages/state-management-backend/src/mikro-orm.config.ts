import { Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { User } from './app/users/entities/user.entity';
import { Review } from './app/reviews/entities/review.entity';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { Business_HQ } from './app/business/entities/business.entity';
import { Business_classification } from './app/business/entities/business_classification.entity';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import 'reflect-metadata';
import { Logger } from '@nestjs/common';
import { Product } from './app/products/entities/product.entity';
import { ProductReview } from './app/reviews/entities/product-review.entity';
import { Customer } from './app/customers/entities/customer.entity';

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
    Review,
    ProductReview,
    Business_HQ,
    Business_classification,
    Product,
    Customer,
  ],
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    path: './database/migrations',
  },
};

export default MikroOrmConfig;
