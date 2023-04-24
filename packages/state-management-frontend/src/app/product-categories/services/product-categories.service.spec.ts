import { TestBed } from '@angular/core/testing';

import { ProductCategoriesService } from './product-categories.service';

fdescribe('ProductCategoriesService', () => {
  let service: ProductCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductCategoriesService);
  });

  //TODO: add tests when backend is ready
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
