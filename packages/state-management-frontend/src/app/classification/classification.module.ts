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
  ClappTextInputModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { ClassificationLayoutFormComponent } from './components/classification-layout-form/classification-layout-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassificationCreateEditDeleteComponent } from './components/classification-create-edit-delete/classification-create-edit-delete.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ConfirmationModalComponent } from '../shared/components/confirmation-modal/confirmation-modal.component';
import { ClassificationMainComponent } from './components/classification-main/classification-main.component';
import { ClassificationService } from './services/classification.service';

const clappModules = [
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappButtonModule,
  ClappImageDisplayModule,
  ClappFileUploadModule,
  ClappNotificationModule,
  ClappNoResultsModule,
  ClappCardModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
];

@NgModule({
  declarations: [
    ClassificationLayoutFormComponent,
    ClassificationCreateEditDeleteComponent,
    ClassificationMainComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    ReactiveFormsModule,
    LoaderComponent,
    ConfirmationModalComponent,
    ...clappModules,
  ],
  providers: [ClassificationService],
})
export class ClassificationModule {}
