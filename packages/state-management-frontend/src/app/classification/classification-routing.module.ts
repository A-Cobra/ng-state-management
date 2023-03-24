import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassificationCreateComponent } from './components/classification-create/classification-create.component';
import { ClassificationEditComponent } from './components/classification-edit/classification-edit.component';

const routes: Routes = [
  { path: 'create', component: ClassificationCreateComponent },
  {
    path: 'detail/:id',
    component: ClassificationEditComponent,
    data: {
      status: 'detail',
    },
  },
  {
    path: 'edit/:id',
    component: ClassificationEditComponent,
    data: {
      status: 'edit',
    },
  },
  {
    path: 'delete/:id',
    component: ClassificationEditComponent,
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
