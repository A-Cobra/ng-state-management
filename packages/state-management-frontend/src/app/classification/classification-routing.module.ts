import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationCreateComponent } from './components/classification-create/classification-create.component';
import { ClassificationEditComponent } from './components/classification-edit/classification-edit.component';
import { ClassificationDeleteComponent } from './components/classification-delete/classification-delete.component';
import { ClassificationMainComponent } from './components/classification-main/classification-main.component';

const routes: Routes = [
  { path: '', component: ClassificationMainComponent },
  { path: 'create', component: ClassificationCreateComponent },
  { path: 'edit/:id', component: ClassificationEditComponent },
  { path: 'delete/:id', component: ClassificationDeleteComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationRoutingModule {}
