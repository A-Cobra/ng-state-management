import { Module } from '@nestjs/common';
import { BusinessService } from '../business/services/business.service';
import { BranchesController } from './controllers/branches.controller';

@Module({
  controllers: [BranchesController],
  providers: [BusinessService]
})
export class BranchesModule {}
