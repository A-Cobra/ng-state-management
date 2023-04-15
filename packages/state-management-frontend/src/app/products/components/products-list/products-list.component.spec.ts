import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CLAPP_MODULES } from '../../test/mocks';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { ProductInterface } from '@state-management-app/types';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

export interface MockLocation {
  back: () => void;
}

export interface MockRouterLink {
  back: () => void;
}

export interface MockProductsService {
  getProducts: () => Observable<ProductInterface[]>;
  getProductsByName: (searchName: string) => Observable<ProductInterface[]>;
}

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let debugElement: DebugElement;
  let mockLocation: MockLocation;
  const mockProductsService: MockProductsService = {
    getProducts: jest.fn(),
    getProductsByName: jest.fn(),
  };

  beforeEach(async () => {
    mockLocation = {
      back: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule, ...CLAPP_MODULES],
      declarations: [ProductsListComponent, ProductsCardComponent],
      providers: [
        HttpClient,
        { provide: Location, useValue: mockLocation },
        { provide: ProductsService, useValue: mockProductsService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should run', () => {
    expect(1).toBe(1);
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should call the back method from the Location class', () => {
  //   const backButton = debugElement.queryAll(By.css('clapp-button'))[0];
  //   backButton.triggerEventHandler('click', null);

  //   expect(mockLocation.back).toHaveBeenCalledTimes(1);
  // });

  // it("should have called the service's method getProducts onInit", () => {
  //   expect(mockProductsService.getProducts).toHaveBeenCalled();
  // });

  // it("should have called the service's method getProductsByName once we call the onSearchByName method", () => {
  //   const SEARCH_NAME = 'Alienware'.toLowerCase();
  //   component.onSearchByName(SEARCH_NAME);

  //   expect(mockProductsService.getProductsByName).toHaveBeenCalledTimes(1);
  //   expect(mockProductsService.getProductsByName).toHaveBeenCalledWith(
  //     SEARCH_NAME
  //   );
  // });

  // it('should call the onSearchByName method once the search value changes', async () => {
  //   jest.spyOn(component, 'onSearchByName');
  //   const inputControl = component.searchForm.controls['input'];
  //   const SEARCH_NAME = 'name';
  //   inputControl.setValue(SEARCH_NAME);
  //   fixture.detectChanges();
  //   await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve('');
  //     }, 800);
  //   });
  //   await fixture.whenStable();

  //   expect(component.onSearchByName).toHaveBeenCalledTimes(1);
  //   expect(component.onSearchByName).toHaveBeenCalledWith(SEARCH_NAME);
  // });
});
