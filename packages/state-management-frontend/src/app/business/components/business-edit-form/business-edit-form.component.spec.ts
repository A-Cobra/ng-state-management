import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ClappButtonModule,
  ClappImageDisplayModule,
  ClappSearchModule,
  ModalService,
} from '@clapp1/clapp-angular';
import { defaultBusinessClassificationBackendData } from '../../utils/default-business-classification-backend-data';
import { MockModalService } from '../../models/mock-modal-service.interface';

import { BusinessEditFormComponent } from './business-edit-form.component';
import { defaultBusinessData } from '../../utils/default-business-data';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormControlTextInputComponent } from '../../../shared/components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import { isALoadableImageUrl } from '../../../core/utils/is-a-displayable-image-url';
import { of } from 'rxjs';
import { FloatNumberOrNumberRangeDirective } from '../../../shared/directives/float-number-or-number-range.directive';
import { PhoneNumberDirective } from '../../../shared/directives/phone-number.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { RIMAC_NEVERA_URL } from '../../../core/test/mocks';
import { CustomFormValidations } from '../../../core/utils/custom-form-validations';

describe('BusinessEditFormComponent', () => {
  let component: BusinessEditFormComponent;
  let fixture: ComponentFixture<BusinessEditFormComponent>;
  let debugElement: DebugElement;
  let mockModalService: MockModalService;

  beforeEach(async () => {
    mockModalService = {
      open: jest.fn(),
      close: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [BusinessEditFormComponent],
      imports: [
        ClappButtonModule,
        ClappImageDisplayModule,
        ClappSearchModule,
        ReactiveFormControlTextInputComponent,
        FloatNumberOrNumberRangeDirective,
        PhoneNumberDirective,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ModalService,
          provider: ModalService,
          // useValue: mockModalService,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessEditFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    // Assigning data so that we can test just this component
    component.businessData = defaultBusinessData;
    component.id = 5;
    component.classificationsBackendData =
      defaultBusinessClassificationBackendData;
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.resetModules();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should enable all controls once we press the edit button', () => {
    const editButton = debugElement.queryAll(By.css('clapp-button'))[1];
    editButton.triggerEventHandler('click', null);

    const allEnabled = Object.keys(component.businessFormEdit.controls).every(
      (controlKey: string) => {
        return component.businessFormEdit.get(controlKey)?.enabled;
      }
    );
    expect(allEnabled).toBe(true);
  });

  it('the onSaveClick method should trigger some other methods and activate a request', () => {
    expect(component.activeRequest).toBe(false);
    component.onSaveClick();
    expect(component.activeRequest).toBe(true);
  });

  it('the onSaveClick method should trigger the modalService open method when it is invalid and not let other methods run', () => {
    component.businessFormEdit.setErrors({ notPhoneNumber: true });
    component.onSaveClick();
    jest.spyOn(component.formSubmit, 'emit');
    jest.spyOn(component, 'toggleEditingStatus');
    expect(component.formSubmit.emit).toHaveBeenCalledTimes(0);
    expect(component.toggleEditingStatus).toHaveBeenCalledTimes(0);
  });

  // it('should trigger a method and return an array of just one element demonstrating that the search works', () => {
  //   const editButton = debugElement.queryAll(By.css('clapp-button'))[1];
  //   editButton.triggerEventHandler('click', null);

  //   const selectInput = debugElement.queryAll(By.css('clapp-select'))[1];
  //   selectInput.triggerEventHandler('click', null);
  //   console.log('editButton');
  //   console.log(editButton);
  //   // fixture.detectChanges();

  //   const clappSearchInput = debugElement.query(By.css('clapp-search'));
  //   clappSearchInput.triggerEventHandler('keyup', { target: { value: '1' } });
  //   expect(component.mockClassificationList.length).toBe(1);
  // });
});
