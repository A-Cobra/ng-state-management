import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ClappButtonModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
} from '@clapp1/clapp-angular';

import { ModalGoBackComponent } from './components/modal-go-back/modal-go-back.component';
import { ClappTextInputComponent } from './components/clapp-text-input-component/clapp-text-input.component';

@NgModule({
  declarations: [ModalGoBackComponent, ClappTextInputComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClappButtonModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [ClappTextInputComponent],
})
export class CoreModule {}
