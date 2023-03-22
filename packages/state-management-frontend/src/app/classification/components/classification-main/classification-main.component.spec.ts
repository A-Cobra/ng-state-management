import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ClassificationMainComponent } from './classification-main.component';
import { mockClassification } from './mockClassification';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { By } from '@angular/platform-browser';

fdescribe('ClassificationMainComponent', () => {
  let component: ClassificationMainComponent;
  let fixture: ComponentFixture<ClassificationMainComponent>;
  let mockRouter: any;
  let mockLocation: any;
  let mockActivatedRoute: any;
  let el: DebugElement;

  beforeEach(async () => {
    mockRouter = {
      navigate: () => {},
    };

    mockLocation = {
      back: () => {},
    };

    mockActivatedRoute = {
      id: 1,
    };

    await TestBed.configureTestingModule({
      declarations: [ClassificationMainComponent],
      providers: [
        {
          provide: Router,
          useValue: mockRouter,
        },
        {
          provide: Location,
          useValue: mockLocation,
        },
        {
          provide: ActivatedRoute,
          useValue: mockActivatedRoute,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show no results if categories is empty', () => {
    component.categories = [];
    fixture.detectChanges();
    const noResults = el.queryAll(By.css('.classification-main__no-results'));
    const results = el.queryAll(By.css('.classification-main__header'));
    expect(noResults.length).toBe(1);
    expect(results.length).toBe(0);
  });

  it('should show the exact amount of results', () => {
    component.categoriesToShow = mockClassification.slice(0, 3);
    fixture.detectChanges();
    const results = el.queryAll(By.css('.classification-main__card'));
    expect(results.length).toBe(3);
  });

  it('should navigate on handleCreate', () => {
    const router = jest.spyOn(mockRouter, 'navigate');
    component.handleCreate();
    fixture.detectChanges();
    expect(router).toHaveBeenCalledTimes(1);
  });

  it('should call location on handleBack', () => {
    const location = jest.spyOn(mockLocation, 'back');
    component.handleBack();
    fixture.detectChanges();
    expect(location).toHaveBeenCalledTimes(1);
  });

  it('should navigate on handleClick', () => {
    const router = jest.spyOn(mockRouter, 'navigate');
    component.handleClick(1);
    fixture.detectChanges();
    expect(router).toHaveBeenCalledTimes(1);
  });

  it('should navigate on handleSubmit', () => {
    const router = jest.spyOn(mockRouter, 'navigate');
    const event = {
      target: {
        value: 'value',
      },
    };
    component.handleSubmit(event as any);
    fixture.detectChanges();
    expect(router).toHaveBeenCalledTimes(1);
  });
});
