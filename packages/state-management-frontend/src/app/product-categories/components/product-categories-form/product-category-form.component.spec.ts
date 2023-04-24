import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { LoaderStubComponent } from '../../../shared/test/mocks/mock-loader';
import { getTestModuleMetadata } from '../../../shared/test/helpers/get-test-module-metadata';
import { mockFormSubmitEvent } from '../../test/mocks';
import { ProductCategoryFormComponent } from './product-category-form.component';
import { PRODUCT_CATEGORIES } from '../../data/product-categories';
import { ProductCategoryInterface } from '@state-management-app/types';

import {
  ClappButtonModule,
  ClappNoResultsModule,
  ClappNotificationModule,
  ClappTextInputModule,
  NotificationService,
} from '@clapp1/clapp-angular';

@Component({
  template: `
    <app-product-category-form
      [productCategory]="productCategory"
      [productCategoryError]="productCategoryError"
      [productCategorySubmitError]="productCategorySubmitError"
      [isCreate]="isCreate"
    >
    </app-product-category-form>
  `,
})
class HostComponent {
  @ViewChild(ProductCategoryFormComponent, { static: true })
  readonly productCategoryFormComponent: ProductCategoryFormComponent;
  productCategory: ProductCategoryInterface | null;
  productCategoryError: Error | null;
  productCategorySubmitError: Error | null;
  isCreate = false;
}

const commonImports = [
  ClappNotificationModule,
  LoaderStubComponent,
  ReactiveFormsModule,
  ClappButtonModule,
  ClappTextInputModule,
  ClappNoResultsModule,
];

const commonDeclarations = [ProductCategoryFormComponent];

describe('ProductCategoriesFormComponent', () => {
  describe('without a host component', () => {
    let component: ProductCategoryFormComponent;
    let fixture: ComponentFixture<ProductCategoryFormComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule(
        getTestModuleMetadata(commonDeclarations, commonImports)
      ).compileComponents();

      fixture = TestBed.createComponent(ProductCategoryFormComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should create a form with two controls and a required validator for name control', () => {
      expect(component.form.controls['name']).toBeTruthy();
      expect(component.form.controls['description']).toBeTruthy();
      expect(
        component.form.controls['name'].hasValidator(Validators.required)
      ).toBe(true);
    });

    it('should return the name control by getter', () => {
      const nameControl = component.name;
      expect(nameControl).toBeTruthy();
    });

    it('should emit the formSubmit event when the form is submitted and valid', () => {
      const emitSpy = jest
        .spyOn(component.formSubmit, 'emit')
        .mockImplementation();
      component.isCreate = true;
      fixture.detectChanges();
      const form = fixture.debugElement.query(By.css('form'));
      //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      component.productCategoryId = mockFormSubmitEvent.id!;
      component.form.controls['description'].setValue(
        mockFormSubmitEvent.productCategory.description
      );

      form.triggerEventHandler('submit', null);

      expect(emitSpy).not.toHaveBeenCalled();

      component.form.controls['name'].setValue(
        mockFormSubmitEvent.productCategory.name
      );

      form.triggerEventHandler('submit', null);

      expect(emitSpy).toHaveBeenCalledWith({
        id: mockFormSubmitEvent.id,
        productCategory: mockFormSubmitEvent.productCategory,
      });
    });
  });

  describe('with a host component', () => {
    let component: HostComponent;
    let childComponent: ProductCategoryFormComponent;
    let fixture: ComponentFixture<HostComponent>;
    let notificationService: NotificationService;

    beforeEach(async () => {
      await TestBed.configureTestingModule(
        getTestModuleMetadata(
          [...commonDeclarations, HostComponent],
          commonImports
        )
      ).compileComponents();

      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      childComponent = component.productCategoryFormComponent;
      notificationService = TestBed.inject(NotificationService);
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display loader if there is no product category and no errors', () => {
      fixture.detectChanges();
      const loader = fixture.debugElement.query(By.css('app-loader'));

      expect(loader).toBeTruthy();
    });

    it('should reset the form, disable it and assign the productCategoryId property when product category changes', () => {
      const resetSpy = jest.spyOn(childComponent.form, 'reset');
      const disableSpy = jest.spyOn(childComponent.form, 'disable');
      component.productCategory = PRODUCT_CATEGORIES[0];

      fixture.detectChanges();

      expect(resetSpy).toHaveBeenCalled();
      expect(disableSpy).toHaveBeenCalled();
      expect(childComponent.productCategoryId).toBe(PRODUCT_CATEGORIES[0].id);
    });

    it('should display an error notification if a submit error occurs', () => {
      const errorSpy = jest
        .spyOn(notificationService, 'error')
        .mockImplementation();
      component.productCategorySubmitError = new Error(
        'Error while creating product category'
      );

      fixture.detectChanges();

      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
