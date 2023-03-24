import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEditFormComponent } from './business-edit-form.component';

describe('BusinessEditFormComponent', () => {
  let component: BusinessEditFormComponent;
  let fixture: ComponentFixture<BusinessEditFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessEditFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
