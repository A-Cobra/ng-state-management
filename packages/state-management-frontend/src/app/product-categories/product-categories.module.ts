import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ProductCategoriesRoutingModule } from './product-categories-routing.module';
import { ProductCategoryComponent } from './components/product-categories/product-category.component';
import { ProductCategoryFormComponent } from './components/product-categories-form/product-category-form.component';

import {
  ClappButtonModule,
  ClappInputHelpersModule,
  ClappNoResultsModule,
  ClappNotificationModule,
  ClappTextInputModule,
  ModalModule,
} from '@clapp1/clapp-angular';

const clappModules = [
  ClappTextInputModule,
  ClappButtonModule,
  ClappNotificationModule,
  ClappInputHelpersModule,
  ClappNoResultsModule,
];

@NgModule({
  declarations: [ProductCategoryComponent, ProductCategoryFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductCategoriesRoutingModule,
    LoaderComponent,
    ModalModule,
    ...clappModules,
  ],
})
export class ProductCategoriesModule {}
