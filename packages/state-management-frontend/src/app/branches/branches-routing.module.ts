import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BranchCreateComponent } from './components/branch-create/branch-create.component';

import { BranchesComponent } from './components/branches/branches.component';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
  },
  {
    path: 'create',
    component: BranchCreateComponent,
  },
  {
    path: ':id',
    component: BranchCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchesRoutingModule {}
