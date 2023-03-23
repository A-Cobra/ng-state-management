import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BusinessController } from './controllers/business.controller';
import { Business_HQ } from './entities/business.entity';
import { Business_classification } from './entities/business_classification.entity';
import { BusinessService } from './services/business.service';

@Module({
  imports: [MikroOrmModule.forFeature([Business_HQ, Business_classification])],
  controllers: [BusinessController],
  providers: [BusinessService],
  exports: [BusinessService],
})
export class BusinessModule {}
