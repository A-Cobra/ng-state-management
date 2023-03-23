import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'businesses',
    loadChildren: () =>
      import('./business/business.module').then((m) => m.BusinessModule),
  },
  {
    path: 'classification',
    loadChildren: () =>
      import('./classification/classification.module').then(
        (m) => m.ClassificationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
