import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'branches',
    loadChildren: () =>
      import('./branches/branches.module').then((m) => m.BranchesModule),
  },
  {
    path: 'businesses',
    loadChildren: () =>
      import('./business/business.module').then((m) => m.BusinessModule),
  },
  {
    path: 'classifications',
    loadChildren: () =>
      import('./classification/classification.module').then(
        (m) => m.ClassificationModule
      ),
  },
  {
    path: 'customers',
    loadChildren: () =>
      import('./customers/customers.module').then((m) => m.CustomersModule),
  },
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'product-categories',
    loadChildren: () =>
      import('./product-categories/product-categories.module').then(
        (m) => m.ProductCategoriesModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
