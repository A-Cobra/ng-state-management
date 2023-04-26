import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BusinessController } from './controllers/business.controller';
import { BusinessHq } from './entities/business.entity';
import { BusinessClassification } from './entities/business-classification.entity';
import { BusinessService } from './services/business.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';
import { BusinessClassificationController } from './controllers/classification.controller';
import { ClassificationService } from './services/classification.service';
import { ProductCategory } from '../products/entities/product-category.entity';

@Module({
  imports: [
    MikroOrmModule.forFeature([
      BusinessHq,
      BusinessClassification,
      ProductCategory,
    ]),
    NotificationsModule,
  ],
  providers: [BusinessService, ClassificationService],
  controllers: [BusinessController, BusinessClassificationController],
  exports: [BusinessService],
})
export class BusinessModule {}
