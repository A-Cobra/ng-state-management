import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
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
  ModalModule,
} from '@clapp1/clapp-angular';
import { ModalInvalidFormComponent } from './components/modal-invalid-form/modal-invalid-form.component';
import { BusinessEditFormComponent } from './components/business-edit-form/business-edit-form.component';
import { ReactiveFormControlTextInputComponent } from '../shared/components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import { FullErrorNamePipe } from '../shared/pipes/full-error-name.pipe';
import { ModalGoBackComponent } from '../shared/components/modal-go-back/modal-go-back.component';
import { FloatNumberOrNumberRangeDirective } from '../core/directives/float-number-or-number-range.directive';
import { PhoneNumberDirective } from '../core/directives/phone-number.directive';

@NgModule({
  declarations: [
    BusinessEditComponent,
    BusinessListComponent,
    BusinessCardComponent,
    ModalInvalidFormComponent,
    BusinessEditFormComponent,
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
    ClappImageDisplayModule,
    ModalModule,
    // Standalone Components
    ReactiveFormControlTextInputComponent,
    ModalGoBackComponent,
    FullErrorNamePipe,
    FloatNumberOrNumberRangeDirective,
    PhoneNumberDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule {}
