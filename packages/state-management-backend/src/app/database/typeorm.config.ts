// this whole file is what the package.json scripts use to connect to the DB without running NestJS,
// PostgreSQL must be running either standalone or in a container
import { DataSource, DataSourceOptions } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { getEnvPath } from '../common/utils/env-path';

const envFilePath: string = getEnvPath(`${__dirname}/../../../../..`);
console.log(envFilePath)
config({ path: envFilePath });

const configService = new ConfigService();
const options: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USER'),
  password: configService.get('DB_PASS'),
  database: configService.get('DB_NAME'),
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [`${__dirname}/migrations/*.ts`],
};

// console.log(options)
export default new DataSource(options);
