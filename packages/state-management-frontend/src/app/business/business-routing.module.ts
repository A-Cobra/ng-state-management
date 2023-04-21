import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessCreateFormComponent } from './components/business-create-form/business-create-form.component';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { BusinessesListComponent } from './components/businesses-list/businesses-list.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessesListComponent,
  },
  {
    path: 'create',
    component: BusinessCreateFormComponent,
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
