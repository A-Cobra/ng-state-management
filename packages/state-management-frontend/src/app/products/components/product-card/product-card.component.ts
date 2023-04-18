import { Component, Input } from '@angular/core';
import { ProductInterface } from '@state-management-app/types';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input()
  product: ProductInterface;
  countryCode = 'USD';
  currencyDisplay = 'symbol';
  currencyDigits = '1.2-2';
}
