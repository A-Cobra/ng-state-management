import { Component, Input } from '@angular/core';
import { ProductInterface } from '@state-management-app/types';

@Component({
  selector: 'app-products-list-display',
  templateUrl: './products-list-display.component.html',
  styleUrls: ['./products-list-display.component.scss'],
})
export class ProductsListDisplayComponent {
  @Input()
  productsList: ProductInterface[];
}
