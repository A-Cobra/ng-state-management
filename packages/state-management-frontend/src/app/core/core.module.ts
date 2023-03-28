import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PhoneNumberDirective } from './directives/phone-number.directive';
import { FloatNumberOrNumberRangeDirective } from './directives/float-number-or-number-range.directive';

import {
  ClappButtonModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
} from '@clapp1/clapp-angular';

// import { ModalGoBackComponent } from './components/modal-go-back/modal-go-back.component';
import { ReactiveFormControlTextInputComponent } from './components/reactive-form-control-text-input/reactive-form-control-text-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClappButtonModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
  ],
  declarations: [
    PhoneNumberDirective,
    FloatNumberOrNumberRangeDirective,
    ReactiveFormControlTextInputComponent,
  ],
  exports: [
    PhoneNumberDirective,
    FloatNumberOrNumberRangeDirective,
    ReactiveFormControlTextInputComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CoreModule {}
