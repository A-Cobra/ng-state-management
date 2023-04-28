import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductCategoryComponent } from './components/product-categories/product-category.component';
import { unsavedFormGuard } from '../shared/guards/unsaved-form.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'create',
    pathMatch: 'full',
  },
  {
    path: 'create',
    canDeactivate: [unsavedFormGuard],
    component: ProductCategoryComponent,
    title: 'Create Product Category',
  },
  {
    path: ':id',
    canDeactivate: [unsavedFormGuard],
    component: ProductCategoryComponent,
    title: 'Product Category',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductCategoriesRoutingModule {}
