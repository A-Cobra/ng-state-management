import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationRoutingModule } from './classification-routing.module';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappInputHelpersModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { ClassificationCreateComponent } from './components/classification-create/classification-create.component';
import { ClassificationEditComponent } from './components/classification-edit/classification-edit.component';
import { ClassificationDeleteComponent } from './components/classification-delete/classification-delete.component';
import { ClassificationLayoutCUDComponent } from './components/classification-layout-cud/classification-layout-cud.component';
import { ClassificationMainComponent } from './components/classification-main/classification-main.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClassificationCreateComponent,
    ClassificationEditComponent,
    ClassificationDeleteComponent,
    ClassificationLayoutCUDComponent,
    ClassificationMainComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappButtonModule,
    ClappSearchModule,
    ReactiveFormsModule,
    ClappPaginationModule,
    ClappNoResultsModule,
    ClappCardModule,
  ],
})
export class ClassificationModule {}
