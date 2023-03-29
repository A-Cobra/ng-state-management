import { Options, ReflectMetadataProvider } from '@mikro-orm/core';
import { ConfigService } from '@nestjs/config';
import { User } from './app/users/entities/user.entity';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { BusinessHq } from './app/business/entities/business.entity';
import { BusinessClassification } from './app/business/entities/business-classification.entity';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import 'reflect-metadata';
import { Logger } from '@nestjs/common';

dotenvExpand.expand(dotenv.config());

const configService = new ConfigService();

const logger = new Logger('MikroORM');

const MikroOrmConfig: Options = {
  debug: true,
  logger: logger.log.bind(logger),
  type: 'postgresql',
  clientUrl: 'postgres://postgres:123456@localhost:5432/state_db',
  entities: [User, BusinessHq, BusinessClassification],
  metadataProvider: ReflectMetadataProvider,
  migrations: {
    path: './database/migrations',
  },
};

export default MikroOrmConfig;
