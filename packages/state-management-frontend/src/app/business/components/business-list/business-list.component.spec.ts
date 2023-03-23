import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessListComponent } from './business-list.component';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'state-management-app-business-card',
  template: '',
})
class MockBusinessCardComponent {
  @Input() businessId: number;
}

describe('BusinessListComponent', () => {
  let component: BusinessListComponent;
  let fixture: ComponentFixture<BusinessListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessListComponent, MockBusinessCardComponent],
      imports: [
        ClappButtonModule,
        ClappSearchModule,
        ClappPaginationModule,
        ClappCardModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
