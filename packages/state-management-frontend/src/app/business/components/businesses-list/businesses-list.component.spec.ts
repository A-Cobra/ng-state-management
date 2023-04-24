import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessesListComponent } from './businesses-list.component';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-business-card',
  template: '',
})
class MockBusinessCardComponent {
  @Input() businessId: number;
}

describe('BusinessListComponent', () => {
  let component: BusinessesListComponent;
  let fixture: ComponentFixture<BusinessesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessesListComponent, MockBusinessCardComponent],
      imports: [
        ClappButtonModule,
        ClappSearchModule,
        ClappPaginationModule,
        ClappCardModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
