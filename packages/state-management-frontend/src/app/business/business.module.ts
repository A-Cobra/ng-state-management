import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappSelectModule,
  ClappImageDisplayModule,
} from '@clapp1/clapp-angular';

import { BusinessRoutingModule } from './business-routing.module';
import { CreateFormComponent } from './components/create-form/create-form.component';

@NgModule({
  declarations: [CreateFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BusinessRoutingModule,
    ClappButtonModule,
    ClappCardModule,
    ClappPaginationModule,
    ClappSearchModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappSelectModule,
    ClappImageDisplayModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule {}
