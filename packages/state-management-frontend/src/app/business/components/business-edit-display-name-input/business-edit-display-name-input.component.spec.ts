import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessEditDisplayNameInputComponent } from './business-edit-display-name-input.component';

describe('BusinessEditDisplayNameInputComponent', () => {
  let component: BusinessEditDisplayNameInputComponent;
  let fixture: ComponentFixture<BusinessEditDisplayNameInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessEditDisplayNameInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessEditDisplayNameInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
