import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationRoutingModule } from './classification-routing.module';
import {
  ClappButtonModule,
  ClappFileUploadModule,
  ClappImageDisplayModule,
  ClappInputHelpersModule,
  ClappNoResultsModule,
  ClappNotificationModule,
  ClappTextareaModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { ClassificationLayoutFormComponent } from './components/classification-layout-form/classification-layout-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassificationCreateEditDeleteComponent } from './components/classification-edit-delete/classification-create-edit-delete.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';

const clappModules = [
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappButtonModule,
  ClappImageDisplayModule,
  ClappFileUploadModule,
  ClappTextareaModule,
  ClappNotificationModule,
  ClappNoResultsModule,
];

@NgModule({
  declarations: [
    ClassificationLayoutFormComponent,
    ClassificationCreateEditDeleteComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    ReactiveFormsModule,
    LoaderComponent,
    ConfirmationModalComponent,
    ...clappModules,
  ],
})
export class ClassificationModule {}
