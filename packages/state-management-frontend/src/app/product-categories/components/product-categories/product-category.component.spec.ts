import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ProductCategoryComponent } from './product-category.component';
import { ProductCategoryFormStubComponent } from '../../../shared/test/mocks/mock-product-category-form';
import {
  mockActivatedRoute,
  mockProductCategoriesService,
  mockProductCategoriesServiceFailure,
} from '../../test/mocks';
import { ProductCategoriesService } from '../../services/product-categories.service';
import { PRODUCT_CATEGORIES } from '../../data/product-categories';
import { getTestModuleMetadata } from '../../../shared/test/helpers/get-test-module-metadata';

import { take } from 'rxjs/operators';

const commonDeclarations = [
  ProductCategoryComponent,
  ProductCategoryFormStubComponent,
];

const commonImports = [RouterTestingModule];

describe('ProductCategoryComponent', () => {
  let component: ProductCategoryComponent;
  let fixture: ComponentFixture<ProductCategoryComponent>;
  let router: Router;

  describe('when no id is provided', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule(
        getTestModuleMetadata(commonDeclarations, commonImports, [
          {
            provide: ProductCategoriesService,
            useValue: mockProductCategoriesService,
          },
        ])
      ).compileComponents();

      fixture = TestBed.createComponent(ProductCategoryComponent);
      component = fixture.componentInstance;
      router = TestBed.inject(Router);
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should enable create mode if no id is provided', async () => {
      await fixture.whenStable();
      expect(component.isCreateMode).toBe(true);
    });

    it('should check if the form is saved', () => {
      component['productCategoryForm'].form.markAsDirty();
      expect(component.isFormSaved()).toBe(false);

      component.skipConfirmation = true;
      expect(component.isFormSaved()).toBe(true);
    });

    it('should create a product category successfully', () => {
      const navigateSpy = jest.spyOn(router, 'navigate').mockImplementation();
      component.onFormSubmit({
        id: '1',
        productCategory: { name: 'Test', description: 'Test description' },
      });
      component.productCategory$.pipe(take(1)).subscribe((productCategory) => {
        expect(productCategory).toEqual(PRODUCT_CATEGORIES[0]);
        expect(navigateSpy).toHaveBeenCalledWith([
          '/product-categories',
          productCategory.id,
        ]);
      });
    });
  });

  describe('when BE returns success responses', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule(
        getTestModuleMetadata(commonDeclarations, commonImports, [
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
          },
          {
            provide: ProductCategoriesService,
            useValue: mockProductCategoriesService,
          },
        ])
      ).compileComponents();

      fixture = TestBed.createComponent(ProductCategoryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should get a product category if a valid id is provided', async () => {
      await fixture.whenStable();
      expect(component.isCreateMode).toBe(false);
      component.productCategory$.pipe(take(1)).subscribe((productCategory) => {
        expect(productCategory).toEqual(PRODUCT_CATEGORIES[0]);
      });
    });

    it('should update a product category successfully', () => {
      component.onFormSubmit({
        id: '1',
        productCategory: { name: 'Test', description: 'Test description' },
      });
      component.productCategory$.pipe(take(1)).subscribe((productCategory) => {
        expect(productCategory).toEqual(PRODUCT_CATEGORIES[1]);
      });
    });
  });

  describe('when BE returns error responses', () => {
    beforeEach(async () => {
      await TestBed.configureTestingModule(
        getTestModuleMetadata(commonDeclarations, commonImports, [
          {
            provide: ActivatedRoute,
            useValue: mockActivatedRoute,
          },
          {
            provide: ProductCategoriesService,
            useValue: mockProductCategoriesServiceFailure,
          },
        ])
      ).compileComponents();

      fixture = TestBed.createComponent(ProductCategoryComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should emit an error in the product category error stream', (done) => {
      fixture.whenStable().then(() => {
        expect(component.isCreateMode).toBe(false);
        component.productCategoryError$.pipe(take(1)).subscribe((error) => {
          expect(error.message).toBe('Get product category test error');
          done();
        });
      });
    });

    it('should emit an error in the product category submit error stream if creating a product category fails', (done) => {
      component.isCreateMode = true;
      component.onFormSubmit({
        id: '1',
        productCategory: { name: 'Test', description: 'Test description' },
      });
      component.productCategory$.pipe(take(1)).subscribe({
        error: () => {
          expect(component.isCreateMode).toBe(true);
          expect(component.skipConfirmation).toBe(false);
          done();
        },
      });
    });

    it('should emit an error in the product category submit error stream', (done) => {
      component.onFormSubmit({
        id: '1',
        productCategory: { name: 'Test', description: 'Test description' },
      });
      component.productCategorySubmitError$.pipe(take(1)).subscribe((error) => {
        expect(error.message).toBe('Update product category test error');
        done();
      });
    });
  });
});
