import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormTextInputComponent } from './reactive-form-text-input.component';
import {
  ClappTextInputModule,
  ClappInputHelpersModule,
} from '@clapp1/clapp-angular';

describe('ReactiveFormTextInputComponent', () => {
  let component: ReactiveFormTextInputComponent;
  let fixture: ComponentFixture<ReactiveFormTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReactiveFormTextInputComponent],
      imports: [
        ReactiveFormsModule,
        ClappTextInputModule,
        ClappInputHelpersModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormTextInputComponent);
    component = fixture.componentInstance;
    component.parentForm = new FormGroup({
      controlName: new FormControl(),
    });
    component.controlName = 'controlName';
    component.label = 'Test Label';
    component.maxLength = 20;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should display label correctly', () => {
    const labelEl = fixture.nativeElement.querySelector('label');
    expect(labelEl.textContent).toContain(component.label);
  });
  it('should set input type correctly', () => {
    const inputEl = fixture.nativeElement.querySelector('input');
    expect(inputEl.type).toEqual(component.inputType);
  });
});
