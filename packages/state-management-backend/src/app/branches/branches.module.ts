import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BusinessModule } from '../business/business.module';
import { BusinessHq } from '../business/entities/business.entity';
import { BranchesController } from './controllers/branches.controller';
import { BusinessBranch } from './entities/business-branch.entity';
import { BranchesService } from './services/branches.service';

@Module({
  imports: [
    MikroOrmModule.forFeature([BusinessBranch, BusinessHq]),
    BusinessModule,
  ],
  controllers: [BranchesController],
  providers: [BranchesService],
})
export class BranchesModule {}
