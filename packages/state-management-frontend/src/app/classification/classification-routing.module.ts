import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationCreateEditDeleteComponent } from './components/classification-edit-delete/classification-create-edit-delete.component';

const routes: Routes = [
  {
    path: 'create',
    component: ClassificationCreateEditDeleteComponent,
    data: {
      status: 'create',
    },
  },
  {
    path: 'detail/:id',
    component: ClassificationCreateEditDeleteComponent,
    data: {
      status: 'detail',
    },
  },
  {
    path: 'edit/:id',
    component: ClassificationCreateEditDeleteComponent,
    data: {
      status: 'edit',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationRoutingModule {}
