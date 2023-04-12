import { Component, Input } from '@angular/core';
import { ProductInterface } from '@state-management-app/types';

@Component({
  selector: 'app-products-card',
  templateUrl: './products-card.component.html',
  styleUrls: ['./products-card.component.scss'],
})
export class ProductsCardComponent {
  @Input()
  productData: ProductInterface;
}
