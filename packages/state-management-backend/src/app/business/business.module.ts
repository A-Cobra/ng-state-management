import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BusinessController } from './controllers/business.controller';
import { BusinessHq } from './entities/business.entity';
import { BusinessClassification } from './entities/business-classification.entity';
import { BusinessService } from './services/business.service';
import { NotificationsModule } from '../notifications/notifications.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MikroOrmModule.forFeature([BusinessHq, BusinessClassification]),
    NotificationsModule,
    UsersModule,
  ],
  providers: [BusinessService],
  controllers: [BusinessController],
  exports: [BusinessService],
})
export class BusinessModule {}
