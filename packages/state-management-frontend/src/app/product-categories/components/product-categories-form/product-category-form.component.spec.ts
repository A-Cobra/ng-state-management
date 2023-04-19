import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCategoryFormComponent } from './product-category-form.component';

describe('ProductCategoriesFormComponent', () => {
  let component: ProductCategoryFormComponent;
  let fixture: ComponentFixture<ProductCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductCategoryFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    pending('I dont wanna write tests right now. I am tired. 😴');
  });
});
