import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationCreateEditDeleteComponent } from './components/classification-create-edit-delete/classification-create-edit-delete.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/classifications',
    pathMatch: 'full',
  },
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
  {
    path: '**',
    redirectTo: '/classifications',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassificationRoutingModule {}
