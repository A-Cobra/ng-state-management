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
} from '@clapp1/clapp-angular';

import { BusinessListComponent } from './components/business-list/business-list.component';
import { BusinessCardComponent } from './components/business-card/business-card.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { ModalSureToLeaveComponent } from './components/creat-form-childs/modal-sure-to-leave/modal-sure-to-leave.component';

@NgModule({
  declarations: [
    BusinessListComponent,
    BusinessCardComponent,
    CreateFormComponent,
    ModalSureToLeaveComponent,
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
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule {}
