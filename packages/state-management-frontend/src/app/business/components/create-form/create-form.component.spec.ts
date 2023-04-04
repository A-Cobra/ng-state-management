import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CreateFormComponent } from './create-form.component';
import { BusinessService } from '../../services/business.service';
import {
  ClappButtonModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappSelectModule,
  ClappImageDisplayModule,
  ModalModule,
  ClappNotificationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { MOCK_FORM_VALUE, MOCK_FORM_CONTROLS } from '../../test/mocks';
import { ReactiveFormControlTextInputComponent } from '../../../shared/components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import { FloatNumberOrNumberRangeDirective } from '../../../shared/directives/float-number-or-number-range.directive';
import { OnlyNumberDirective } from '../../../shared/directives/only-number.directive';

describe('CreateFormComponent', () => {
  let component: CreateFormComponent;
  let fixture: ComponentFixture<CreateFormComponent>;
  let mockBusinessService: any;

  beforeEach(async () => {
    mockBusinessService = {
      addNewBusiness: jest.fn(() => of()),
      getClassifications: jest.fn(() => of([])),
    };

    await TestBed.configureTestingModule({
      declarations: [CreateFormComponent],
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        ClappButtonModule,
        ClappTextInputModule,
        ClappInputHelpersModule,
        ClappSelectModule,
        ClappImageDisplayModule,
        ModalModule,
        ClappNotificationModule,
        ReactiveFormControlTextInputComponent,
        ClappSearchModule,
        FloatNumberOrNumberRangeDirective,
        OnlyNumberDirective,
      ],
      providers: [{ provide: BusinessService, useValue: mockBusinessService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.createForm).toBeDefined();
  });

  it('should set up the form on setUpForm', () => {
    component.getFormInitialValue();
    expect(component.createForm).toBeDefined();
  });

  it('should initialize the createForm property with the correct form controls', () => {
    const expectedFormControls = MOCK_FORM_CONTROLS;
    expect(Object.keys(component.createForm.controls)).toEqual(
      expectedFormControls
    );
  });

  it('onSubmit should call businessService.addNewBusiness with the correct form value', () => {
    const mockFormValue = MOCK_FORM_VALUE;

    component.createForm.setValue(mockFormValue);
    component.onSubmit();

    expect(mockBusinessService.addNewBusiness).toHaveBeenCalledWith(
      mockFormValue
    );
  });

  it('should disable form and show loader when submitting', () => {
    component.onSubmit();
    expect(component.createForm.disabled).toBeTruthy();
    expect(component.isLoading).toBeTruthy();
  });
});
