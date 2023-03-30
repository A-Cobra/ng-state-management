import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { getEnvPath } from './common/utils/env-path';
import { validate } from './common/utils/env-validate';
import { DBModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BusinessModule } from './business/business.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomersModule } from './customers/customers.module';

const envFilePath = getEnvPath(process.env.WORKDIR);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validate,
      isGlobal: true,
    }),
    UsersModule,
    AuthModule,
    DBModule,
    ProductsModule,
    BusinessModule,
    MikroOrmModule.forRoot(),
    ReviewsModule,
    CustomersModule,
  ],
  controllers: [],
})
export class AppModule {}
