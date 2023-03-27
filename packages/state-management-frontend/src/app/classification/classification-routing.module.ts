import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationEditDeleteComponent } from './components/classification-edit-delete/classification-edit-delete.component';

const routes: Routes = [
  {
    path: 'create',
    component: ClassificationEditDeleteComponent,
    data: {
      status: 'create',
    },
  },
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
      status: 'detail',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationRoutingModule {}
