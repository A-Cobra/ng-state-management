import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClappTextInputComponent } from './clapp-text-input.component';

describe('ClappTextInputComponent', () => {
  let component: ClappTextInputComponent;
  let fixture: ComponentFixture<ClappTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClappTextInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClappTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
