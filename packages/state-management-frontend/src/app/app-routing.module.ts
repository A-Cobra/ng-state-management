import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'businesses',
    loadChildren: () =>
      import('./business/business.module').then((m) => m.BusinessModule),
  },
  {
    path: 'branches',
    loadChildren: () =>
      import('./branches/branches.module').then((m) => m.BranchesModule),
  },
  {
    path: 'classifications',
    loadChildren: () =>
      import('./classification/classification.module').then(
        (m) => m.ClassificationModule
      ),
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
