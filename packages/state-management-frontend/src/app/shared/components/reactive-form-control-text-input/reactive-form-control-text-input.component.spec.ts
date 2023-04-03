import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import {
  ClappTextInputModule,
  ClappInputHelpersModule,
} from '@clapp1/clapp-angular';
import { ReactiveFormControlTextInputComponent } from './reactive-form-control-text-input.component';

describe('ReactiveFormTextInputComponent', () => {
  let component: ReactiveFormControlTextInputComponent;
  let fixture: ComponentFixture<ReactiveFormControlTextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ClappTextInputModule,
        ClappInputHelpersModule,
        ReactiveFormControlTextInputComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReactiveFormControlTextInputComponent);
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
