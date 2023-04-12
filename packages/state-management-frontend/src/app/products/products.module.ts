import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import {
  ClappButtonModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';

const clappImports = [
  ClappPaginationModule,
  ClappButtonModule,
  ClappSearchModule,
];

@NgModule({
  declarations: [ProductsListComponent],
  imports: [CommonModule, ProductsRoutingModule, ...clappImports],
})
export class ProductsModule {}
