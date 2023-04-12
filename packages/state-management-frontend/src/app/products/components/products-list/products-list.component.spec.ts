import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsListComponent } from './products-list.component';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CLAPP_MODULES } from '../../test/mocks';
import { ProductsCardComponent } from '../products-card/products-card.component';
import { RouterTestingModule } from '@angular/router/testing';

export interface MockLocation {
  back: () => void;
}

export interface MockRouterLink {
  back: () => void;
}

describe('ProductsListComponent', () => {
  let component: ProductsListComponent;
  let fixture: ComponentFixture<ProductsListComponent>;
  let debugElement: DebugElement;
  let mockLocation: MockLocation;

  beforeEach(async () => {
    mockLocation = {
      back: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [...CLAPP_MODULES, RouterTestingModule],
      declarations: [ProductsListComponent, ProductsCardComponent],
      providers: [{ provide: Location, useValue: mockLocation }],
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
});
