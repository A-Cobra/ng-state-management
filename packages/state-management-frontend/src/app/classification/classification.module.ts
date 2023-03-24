import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationRoutingModule } from './classification-routing.module';
import {
  ClappButtonModule,
  ClappFileUploadModule,
  ClappImageDisplayModule,
  ClappInputHelpersModule,
  ClappTextareaModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { ClassificationCreateComponent } from './components/classification-create/classification-create.component';
import { ClassificationEditComponent } from './components/classification-edit/classification-edit.component';
import { ClassificationLayoutCUDComponent } from './components/classification-layout-cud/classification-layout-cud.component';
import { ReactiveFormsModule } from '@angular/forms';

const clappModules = [
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappButtonModule,
  ClappImageDisplayModule,
  ClappFileUploadModule,
  ClappTextareaModule,
];

@NgModule({
  declarations: [
    ClassificationCreateComponent,
    ClassificationEditComponent,
    ClassificationLayoutCUDComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    ReactiveFormsModule,
    ...clappModules,
  ],
})
export class ClassificationModule {}
