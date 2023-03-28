import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import {
  ClappButtonModule,
  ClappSearchModule,
  ClappPaginationModule,
  ClappCardModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappSelectModule,
  ClappImageDisplayModule,
  ModalModule,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';

import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ClappTextInputComponent } from './components/create-form-child/clapp-text-input-component/clapp-text-input.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessCardComponent,
    CreateFormComponent,
    ClappTextInputComponent,
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ClappButtonModule,
    ClappSearchModule,
    ClappPaginationModule,
    ClappCardModule,
    ReactiveFormsModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappSelectModule,
    ClappImageDisplayModule,
    ModalModule,
    ClappNotificationModule,
    LoaderComponent,
    ConfirmationModalComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule {}
