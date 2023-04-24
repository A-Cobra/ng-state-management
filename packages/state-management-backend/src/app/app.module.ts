import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { getEnvPath } from './common/utils/env-path';
import { validate } from './common/utils/env-validate';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { BusinessModule } from './business/business.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { BranchesModule } from './branches/branches.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CustomersModule } from './customers/customers.module';
import { NotificationsModule } from './notifications/notifications.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { CouriersModule } from './couriers/couriers.module';
import { ProductCategoryModule } from './product-category/product-category.module';
import { AnalyticsModule } from './analytics/analytics.module';

const envFilePath = getEnvPath(process.env.WORKDIR);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      validate,
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    UsersModule,
    AuthModule,
    BusinessModule,
    NotificationsModule,
    MikroOrmModule.forRoot(),
    BranchesModule,
    ReviewsModule,
    CustomersModule,
    CouriersModule,
    ProductCategoryModule,
    AnalyticsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
