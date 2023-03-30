import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateFormComponent } from './create-form.component';
import { of } from 'rxjs';
import { BusinessService } from '../../services/business.service';

import { ModalService, NotificationService } from '@clapp1/clapp-angular';
import {
  ClappButtonComponent,
  ClappTextInputComponent,
  ClappHelperTextComponent,
  ClappSelectComponent,
  ClappImageDisplayComponent,
  ClappModalComponent,
  ClappNotificationComponent,
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
  let mockBusinessService: Partial<BusinessService>;
  let mockModalService: Partial<ModalService>;
  let mockNotificationService: Partial<NotificationService>;

  beforeEach(async () => {
    mockBusinessService = {
      addNewBusiness: jest.fn(() => of()),
      getClassifications: jest.fn(() => of([])),
    };
    mockModalService = {
      open: jest.fn().mockReturnValue({ afterClosed: () => of(true) }),
    };
    mockNotificationService = {
      success: jest.fn(),
      error: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [
        CreateFormComponent,
        ClappButtonComponent,
        ClappTextInputComponent,
        ClappHelperTextComponent,
        ClappSelectComponent,
        ClappImageDisplayComponent,
        ClappModalComponent,
        ClappNotificationComponent,
      ],
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
      providers: [
        { provide: BusinessService, useValue: mockBusinessService },
        { provide: ModalService, useValue: mockModalService },
        { provide: NotificationService, useValue: mockNotificationService },
      ],
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

  it('setUpForm should set up the form', () => {
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

  // it('should disable form and show loader when submitting', () => {
  //   component.onSubmit();
  //   expect(component.createForm.disabled).toBeTruthy();
  //   expect(component.loader).toBeTruthy();
  // });

  // it('should enable form and hide loader after successful submission', () => {
  //   const spy = jest.spyOn(component.notificationService, 'success');
  //   component.onSubmit();
  //   expect(component.createForm.disabled).toBeTruthy();
  //   expect(component.loader).toBeTruthy();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.createForm.enabled).toBeTruthy();
  //   expect(component.loader).toBeFalsy();
  // });

  // it('should enable form and hide loader after unsuccessful submission', () => {
  //   const spy = jest.spyOn(component.notificationService, 'error');
  //   mockBusinessService.addNewBusiness = jest.fn(() => {
  //     throw new Error();
  //   });
  //   component.onSubmit();
  //   expect(component.createForm.disabled).toBeTruthy();
  //   expect(component.loader).toBeTruthy();
  //   expect(spy).toHaveBeenCalled();
  //   expect(component.createForm.enabled).toBeTruthy();
  //   expect(component.loader).toBeFalsy();
  // });

  // it('should navigate to businesses on go back if changes have not been saved', () => {
  //   mockModalService.open = jest.fn(() => of(true));
  //   const spy = jest.spyOn(component.router, 'navigate');
  //   component.handleGoBack();
  //   expect(spy).toHaveBeenCalledWith(['/businesses']);
  //   expect(component.loader).toBeTruthy();
  // });

  it('should unsubscribe on destroy', () => {
    const unsubscribeSpy = jest.spyOn(component.unsubscribe$, 'next');
    component.ngOnDestroy();
    fixture.destroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
  });
});
