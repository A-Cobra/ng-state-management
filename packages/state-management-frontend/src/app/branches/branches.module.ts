import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BranchCardComponent } from './components/branch-card/branch-card.component';
import { BranchesComponent } from './components/branches/branches.component';
import { BranchesRoutingModule } from './branches-routing.module';

import {
  ClappButtonModule,
  ClappCardModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';

@NgModule({
  declarations: [BranchesComponent, BranchCardComponent],
  imports: [
    BranchesRoutingModule,
    ClappButtonModule,
    ClappCardModule,
    ClappNoResultsModule,
    ClappPaginationModule,
    ClappSearchModule,
    CommonModule,
    ReactiveFormsModule,
  ],
})
export class BranchesModule {}
