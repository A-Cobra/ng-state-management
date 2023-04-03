import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BranchCardComponent } from './components/branch-card/branch-card.component';
import { BranchesComponent } from './components/branches/branches.component';
import { BranchesRoutingModule } from './branches-routing.module';

import {
  ClappButtonModule,
  ClappCardModule,
  ClappImageDisplayModule,
  ClappInputHelpersModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
  ClappSelectModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { BranchCreateComponent } from './components/branch-create/branch-create.component';

@NgModule({
  declarations: [BranchesComponent, BranchCardComponent, BranchCreateComponent],
  imports: [
    BranchesRoutingModule,
    ClappButtonModule,
    ClappCardModule,
    ClappNoResultsModule,
    ClappPaginationModule,
    ClappSearchModule,
    ClappSelectModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    CommonModule,
    ClappImageDisplayModule,
    ReactiveFormsModule,
  ],
})
export class BranchesModule {}
