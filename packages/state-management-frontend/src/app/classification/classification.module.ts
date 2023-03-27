import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationRoutingModule } from './classification-routing.module';
import {
  ClappButtonModule,
  ClappFileUploadModule,
  ClappImageDisplayModule,
  ClappInputHelpersModule,
  ClappNotificationModule,
  ClappTextareaModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { ClassificationLayoutFormComponent } from './components/classification-layout-form/classification-layout-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassificationEditDeleteComponent } from './components/classification-edit-delete/classification-edit-delete.component';

const clappModules = [
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappButtonModule,
  ClappImageDisplayModule,
  ClappFileUploadModule,
  ClappTextareaModule,
  ClappNotificationModule,
];

@NgModule({
  declarations: [
    ClassificationLayoutFormComponent,
    ClassificationEditDeleteComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    ReactiveFormsModule,

    ...clappModules,
  ],
})
export class ClassificationModule {}
