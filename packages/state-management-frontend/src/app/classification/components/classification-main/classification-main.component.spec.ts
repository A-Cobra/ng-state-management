import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { ClassificationMainComponent } from './classification-main.component';
import { mockClassification } from './mock-classification';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  ClappButtonComponent,
  ClappButtonModule,
  ClappCardComponent,
  ClappCardModule,
  ClappNoResultsComponent,
  ClappNoResultsModule,
  ClappPaginationComponent,
  ClappPaginationModule,
  ClappSearchComponent,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { ReactiveFormsModule } from '@angular/forms';

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
      declarations: [
        ClassificationMainComponent,
        ClappSearchComponent,
        ClappButtonComponent,
        ClappPaginationComponent,
        ClappNoResultsComponent,
        ClappCardComponent,
      ],
      imports: [
        ReactiveFormsModule,
        ClappSearchModule,
        ClappButtonModule,
        ClappPaginationModule,
        ClappNoResultsModule,
        ClappCardModule,
      ],
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
    const results = el.queryAll(By.css('.classification-main__container'));
    expect(noResults.length).toBe(1);
    expect(results.length).toBe(0);
  });

  it('should show the exact amount of results', () => {
    component.categoriesToShow = mockClassification.slice(0, 3);
    fixture.detectChanges();
    const results = el.queryAll(By.css('.classification-main__card'));
    expect(results.length).toBe(3);
  });

  it('should show pagination if totalRecords>pageSize', () => {
    component.pageSize = 12;
    component.totalRecords = 10;
    fixture.detectChanges();
    const noPagination = el.queryAll(
      By.css('.classification-main__pagination')
    );
    expect(noPagination.length).toBe(0);
    component.pageSize = 3;
    component.totalRecords = 10;
    fixture.detectChanges();
    const pagination = el.queryAll(By.css('.classification-main__pagination'));
    expect(pagination.length).toBe(1);
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

  it('should navigate on handleCardClick', () => {
    const router = jest.spyOn(mockRouter, 'navigate');
    component.handleCardClick(1);
    fixture.detectChanges();
    expect(router).toHaveBeenCalledTimes(1);
  });
});
