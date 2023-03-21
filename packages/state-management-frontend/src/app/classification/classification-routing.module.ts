import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationCreateEditComponent } from './classification-create-edit/classification-create-edit.component';

const routes: Routes = [
  { path: '', component: ClassificationCreateEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationRoutingModule {}
