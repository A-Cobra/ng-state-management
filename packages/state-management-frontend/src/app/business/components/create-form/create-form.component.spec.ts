import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { CreateFormComponent } from './create-form.component';
import { ReactiveFormTextInputComponent } from '../create-form-child/reactive-form-text-input-component/reactive-form-text-input.component';
import { BusinessService } from '../../services/business.service';
import {
  ClappButtonModule,
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappSelectModule,
  ClappImageDisplayModule,
  ModalModule,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';

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
      declarations: [CreateFormComponent, ReactiveFormTextInputComponent],
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
    component.setUpForm();
    expect(component.createForm).toBeDefined();
  });

  it('should initialize the createForm property with the correct form controls', () => {
    const expectedFormControls = [
      'name',
      'email',
      'password',
      'classification',
      'address',
      'longitude',
      'latitude',
      'contact',
      'picture',
      'bankAccountNumber',
      'bankName',
      'bankAccountType',
      'fullname',
      'documentId',
    ];
    expect(Object.keys(component.createForm.controls)).toEqual(
      expectedFormControls
    );
  });

  it('onSubmit should call businessService.addNewBusiness with the correct form value', () => {
    const mockFormValue = {
      name: 'Test Business',
      email: 'test@test.com',
      password: 'Test123!',
      classification: '1',
      address: 'Test Address',
      longitude: '0',
      latitude: '0',
      contact: '1234567890',
      picture: 'https://test.com/test.jpg',
      bankAccountNumber: '1234567890',
      bankName: 'Test Bank',
      bankAccountType: 'checking',
      fullname: 'Test User',
      documentId: '1234567890',
    };

    component.createForm.setValue(mockFormValue);
    component.onSubmit();

    expect(mockBusinessService.addNewBusiness).toHaveBeenCalledWith(
      mockFormValue
    );
  });

  it('should disable form and show loader when submitting', () => {
    component.onSubmit();
    expect(component.createForm.disabled).toBeTruthy();
    expect(component.loader).toBeTruthy();
  });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.unsubscribe$, 'next');
    component.ngOnDestroy();
    fixture.destroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
