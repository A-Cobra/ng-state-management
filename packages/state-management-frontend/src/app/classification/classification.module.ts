import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationRoutingModule } from './classification-routing.module';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappInputHelpersModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';

import { ClassificationMainComponent } from './components/classification-main/classification-main.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ClassificationMainComponent],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappButtonModule,
    ClappSearchModule,
    ReactiveFormsModule,
    ClappPaginationModule,
    ClappNoResultsModule,
    ClappCardModule,
  ],
})
export class ClassificationModule {}
