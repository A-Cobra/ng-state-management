import { BusinessListComponent } from './components/business-list/business-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';

const routes: Routes = [
  {
    path: '',
    component: BusinessListComponent,
  },
  {
    path: ':id/edit',
    component: BusinessEditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessRoutingModule {}
