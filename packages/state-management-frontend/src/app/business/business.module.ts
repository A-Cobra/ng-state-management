import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { BusinessService } from './services/business.service';
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
import { ReactiveFormTextInputComponent } from './components/create-form-child/reactive-form-text-input-component/reactive-form-text-input.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';

@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessCardComponent,
    CreateFormComponent,
    ReactiveFormTextInputComponent,
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
  providers: [BusinessService],
})
export class BusinessModule {}
