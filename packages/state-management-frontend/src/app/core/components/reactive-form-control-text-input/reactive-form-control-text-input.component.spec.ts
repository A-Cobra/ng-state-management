import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormControlTextInputComponent } from './reactive-form-control-text-input.component';

describe('ReactiveFormControlTextInputComponent', () => {
  let component: ReactiveFormControlTextInputComponent;
  let fixture: ComponentFixture<ReactiveFormControlTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormControlTextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormControlTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
