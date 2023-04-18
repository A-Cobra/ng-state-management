import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListDisplayComponent } from './products-list-display.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCardComponent } from '../product-card/product-card.component';
import { MOCK_PRODUCTS_DATA } from '../../test/mocks';
import { ClappCardModule } from '@clapp1/clapp-angular';

describe('ProductsListDisplayComponent', () => {
  let component: ProductsListDisplayComponent;
  let fixture: ComponentFixture<ProductsListDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ClappCardModule],
      declarations: [ProductsListDisplayComponent, ProductCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListDisplayComponent);
    component = fixture.componentInstance;
    component.productsList = MOCK_PRODUCTS_DATA.data;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
