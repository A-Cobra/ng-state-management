import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { ReactiveFormControlTextInputComponent } from './components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import {
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
  ClappSelectModule,
} from '@clapp1/clapp-angular';
import { FullErrorNamePipe } from '../core/pipes/full-error-name.pipe';

@NgModule({
  declarations: [
    BusinessEditComponent,
    BusinessListComponent,
    BusinessCardComponent,
    ReactiveFormControlTextInputComponent,
    FullErrorNamePipe,
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ReactiveFormsModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappButtonModule,
    ClappSearchModule,
    ClappPaginationModule,
    ClappCardModule,
    ClappSelectModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule {}
