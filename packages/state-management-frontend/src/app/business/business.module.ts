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
import { FloatNumberOrNumberRangeDirective } from '../shared/directives/float-number-or-number-range.directive';
import { PhoneNumberDirective } from '../shared/directives/phone-number.directive';
import { GoBackModalComponent } from '../shared/components/go-back-modal/go-back-modal.component';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';

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
    GoBackModalComponent,
    ConfirmationModalComponent,
    FullErrorNamePipe,
    FloatNumberOrNumberRangeDirective,
    PhoneNumberDirective,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule {}
