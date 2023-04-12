import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './components/products-list/products-list.component';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { ProductsCardComponent } from './components/products-card/products-card.component';

const CLAPP_MODULES = [
  ClappPaginationModule,
  ClappButtonModule,
  ClappSearchModule,
  ClappCardModule,
];

@NgModule({
  declarations: [ProductsListComponent, ProductsCardComponent],
  imports: [CommonModule, ProductsRoutingModule, ...CLAPP_MODULES],
})
export class ProductsModule {}
