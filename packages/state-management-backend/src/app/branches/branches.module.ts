import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { Business_HQ } from '../business/entities/business.entity';
import { BusinessService } from '../business/services/business.service';
import { BranchesController } from './controllers/branches.controller';
import { BusinessBranch } from './entities/businessBranch.entity';
import { BranchesService } from './services/branches.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([BusinessBranch, Business_HQ]),
    BusinessModule,
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
