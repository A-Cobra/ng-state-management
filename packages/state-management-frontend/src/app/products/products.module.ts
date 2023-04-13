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
import { HttpClientModule } from '@angular/common/http';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { ProductsService } from './services/products.service';

const CLAPP_MODULES = [
  ClappPaginationModule,
  ClappButtonModule,
  ClappSearchModule,
  ClappCardModule,
];

@NgModule({
  declarations: [ProductsListComponent, ProductsCardComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    HttpClientModule,
    ...CLAPP_MODULES,
  ],
  providers: [ProductsService],
})
export class ProductsModule {}
