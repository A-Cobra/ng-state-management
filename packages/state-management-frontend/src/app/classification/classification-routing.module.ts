import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationCreateComponent } from './components/classification-create/classification-create.component';
import { ClassificationEditDeleteComponent } from './components/classification-edit-delete/classification-edit-delete.component';

const routes: Routes = [
  { path: 'create', component: ClassificationCreateComponent },
  {
    path: 'detail/:id',
    component: ClassificationEditDeleteComponent,
    data: {
      status: 'detail',
    },
  },
  {
    path: 'edit/:id',
    component: ClassificationEditDeleteComponent,
    data: {
      status: 'edit',
    },
  },
  {
    path: 'delete/:id',
    component: ClassificationEditDeleteComponent,
    data: {
      status: 'delete',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationRoutingModule {}
