import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BusinessController } from './controllers/business.controller';
import { BusinessHq } from './entities/business.entity';
import { BusinessClassification } from './entities/business-classification.entity';
import { BusinessService } from './services/business.service';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([BusinessHq, BusinessClassification]),
    NotificationsModule,
  ],
  providers: [BusinessService],
  controllers: [BusinessController],
})
export class BusinessModule {}
