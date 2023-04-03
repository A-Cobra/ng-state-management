import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { BusinessListComponent } from './components/business-list/business-list.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessListComponent,
  },
  {
    path: 'create',
    component: CreateFormComponent,
  },
  {
    path: ':id',
    component: BusinessEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
