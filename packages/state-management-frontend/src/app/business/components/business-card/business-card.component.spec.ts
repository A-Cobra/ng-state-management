import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCardComponent } from './business-card.component';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';

describe('BusinessCardComponent', () => {
  let component: BusinessCardComponent;
  let fixture: ComponentFixture<BusinessCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessCardComponent],
      imports: [
        ClappButtonModule,
        ClappSearchModule,
        ClappPaginationModule,
        ClappCardModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
