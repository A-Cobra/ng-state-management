import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsListComponent } from './products-list.component';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  CLAPP_MODULES,
  MockLocation,
  MockProductsService,
  PAGINATION_DATA,
  MOCK_PRODUCTS_DATA,
} from '../../test/mocks';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ProductsService } from '../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let debugElement: DebugElement;
  let mockLocation: MockLocation;
  const mockProductsService: MockProductsService = {
    getProducts: jest.fn(() => of(MOCK_PRODUCTS_DATA)),
    getProductsByQueries: jest.fn(() => of(MOCK_PRODUCTS_DATA)),
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call the back method from the Location class', () => {
    const backButton = debugElement.queryAll(By.css('clapp-button'))[0];
    backButton.triggerEventHandler('click', null);

    expect(mockLocation.back).toHaveBeenCalledTimes(1);
  });

  it("should have called the service's method getProducts onInit", () => {
    expect(mockProductsService.getProducts).toHaveBeenCalled();
  });

  it("should have called the service's method getProductsByName once we call the onSearchByName method", () => {
    jest.spyOn(component, 'onSearchByQueries');
    const SEARCH_NAME = 'Alienware      ';
    component.onSearchByName(SEARCH_NAME);

    expect(component.onSearchByQueries).toHaveBeenCalledTimes(1);
    expect(component.onSearchByQueries).toHaveBeenCalledWith(
      SEARCH_NAME.trim(),
      1
    );
  });

  it('should call the onSearchByName method once the search value changes', async () => {
    jest.spyOn(component, 'onSearchByName');
    const inputControl = component.searchForm.controls['input'];
    const SEARCH_NAME = 'name';
    inputControl.setValue(SEARCH_NAME);
    fixture.detectChanges();
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('');
      }, 800);
    });
    await fixture.whenStable();

    expect(component.onSearchByName).toHaveBeenCalledTimes(1);
    expect(component.onSearchByName).toHaveBeenCalledWith(SEARCH_NAME);
  });

  it('should call the onSearchByQueries method once the pagination changes', () => {
    jest.spyOn(component, 'onSearchByQueries');
    const inputControl = component.searchForm.controls['input'];
    const SEARCH_NAME = 'name';
    inputControl.setValue(SEARCH_NAME);
    fixture.detectChanges();
    component.onPageChange(PAGINATION_DATA);

    expect(component.onSearchByQueries).toHaveBeenCalledTimes(1);
    expect(component.onSearchByQueries).toHaveBeenCalledWith(
      component.searchForm.value.input,
      PAGINATION_DATA.currentPage
    );
  });

  it('should change the pagination data once once we call the onSearchByQueries method', () => {
    const SEARCH_NAME = 'name';
    const PAGE_NUMBER = 3;
    component.paginationConfiguration.totalRecords = 100;
    fixture.detectChanges();
    expect(component.paginationConfiguration.totalRecords).toBe(100);
    component.onSearchByQueries(SEARCH_NAME, PAGE_NUMBER);
    fixture.detectChanges();

    expect(component.paginationConfiguration.totalRecords).toBe(
      MOCK_PRODUCTS_DATA.totalResults
    );
  });
});
