import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationRoutingModule } from './classification-routing.module';
import {
  ClappInputHelpersModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { ClassificationCreateComponent } from './components/classification-create/classification-create.component';
import { ClassificationEditComponent } from './components/classification-edit/classification-edit.component';
import { ClassificationDeleteComponent } from './components/classification-delete/classification-delete.component';
import { ClassificationLayoutCUDComponent } from './components/classification-layout-cud/classification-layout-cud.component';

@NgModule({
  declarations: [
    ClassificationCreateComponent,
    ClassificationEditComponent,
    ClassificationDeleteComponent,
    ClassificationLayoutCUDComponent,
  ],
  imports: [
    CommonModule,
    ClassificationRoutingModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
  ],
})
export class ClassificationModule {}
