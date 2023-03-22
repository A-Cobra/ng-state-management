import { Controller, Get } from '@nestjs/common';
import { BranchesService } from '../services/branches.service';

@Controller({
  path: 'branches',
  version: '1'
})
export class BranchesController {
  constructor(private readonly branchesServices: BranchesService) {}

  @Get()
  findAll() {
    return this.branchesServices.findAll();
  }

}
