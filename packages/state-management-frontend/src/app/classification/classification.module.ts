import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassificationCreateEditComponent } from './classification-create-edit/classification-create-edit.component';
import { ClassificationRoutingModule } from './classification-routing.module';

@NgModule({
  declarations: [ClassificationCreateEditComponent],
  imports: [CommonModule, ClassificationRoutingModule],
})
export class ClassificationModule {}
