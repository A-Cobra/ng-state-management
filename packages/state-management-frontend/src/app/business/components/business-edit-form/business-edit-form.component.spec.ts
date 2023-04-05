import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ClappButtonModule,
  ClappImageDisplayModule,
  ClappSearchModule,
  ModalRef,
  ModalService,
} from '@clapp1/clapp-angular';
import { defaultBusinessClassificationBackendData } from '../../utils/default-business-classification-backend-data';
import { MockModalService } from '../../test/mock-modal-service.interface';

import { BusinessEditFormComponent } from './business-edit-form.component';
import { defaultBusinessData } from '../../utils/default-business-data';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormControlTextInputComponent } from '../../../shared/components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import { FloatNumberOrNumberRangeDirective } from '../../../shared/directives/float-number-or-number-range.directive';
import { OnlyNumberDirective } from '../../../shared/directives/only-number.directive';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('BusinessEditFormComponent', () => {
  let component: BusinessEditFormComponent;
  let fixture: ComponentFixture<BusinessEditFormComponent>;
  let debugElement: DebugElement;
  let mockModalService: MockModalService;
  let mockRouter: {
    navigate: () => void;
  };

  beforeEach(async () => {
    mockModalService = {
      open: jest.fn(),
      close: jest.fn(),
    };
    mockRouter = {
      navigate: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [BusinessEditFormComponent],
      imports: [
        ClappButtonModule,
        ClappImageDisplayModule,
        ClappSearchModule,
        ReactiveFormControlTextInputComponent,
        FloatNumberOrNumberRangeDirective,
        OnlyNumberDirective,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService,
        },
        {
          provide: Router,
          useValue: mockRouter,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessEditFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
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
    jest.spyOn(mockModalService, 'open');
    jest.spyOn(component.formSubmit, 'emit');
    jest.spyOn(component, 'toggleEditingStatus');
    expect(component.activeRequest).toBe(false);
    component.onSaveClick();

    expect(component.activeRequest).toBe(true);
    expect(component.formSubmit.emit).toHaveBeenCalledTimes(1);
    expect(component.toggleEditingStatus).toHaveBeenCalledTimes(1);
  });

  it('the onSaveClick method should trigger the modalService open method when it is invalid and not let other methods run', () => {
    // Manually setting the form's invalidity state
    jest.spyOn(mockModalService, 'open');
    jest.spyOn(component.formSubmit, 'emit');
    jest.spyOn(component, 'toggleEditingStatus');
    Object.defineProperty(component.businessFormEdit, 'invalid', {
      get: () => true,
    });

    expect(component.businessFormEdit.invalid).toBe(true);

    component.onSaveClick();

    expect(mockModalService.open).toHaveBeenCalledTimes(1);
    expect(component.formSubmit.emit).toHaveBeenCalledTimes(0);
    expect(component.toggleEditingStatus).toHaveBeenCalledTimes(0);
  });

  it('should trigger a method and return an array of just one element demonstrating that the search works', () => {
    const htmlInput = document.createElement('input');
    htmlInput.value = '1';
    const keyEvent = new KeyboardEvent('keydown', { key: 'a' });
    Object.defineProperty(keyEvent, 'target', {
      writable: false,
      value: htmlInput,
    });
    component.onSearchKeyUp(keyEvent);

    expect(component.mockClassificationList.length).toBe(1);
  });

  it("should trigger the modal's open method once we call the onGoToBusinessesList method and call the router's navigate method", () => {
    const route = ['businesses'];
    const modalRef = new ModalRef();
    jest.spyOn(modalRef, 'afterClosed', 'get').mockReturnValue(of(true));
    modalRef.close(true);
    jest.spyOn(mockModalService, 'open').mockReturnValue(modalRef);
    component.onGoToBusinessesList();

    expect(mockModalService.open).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenCalledTimes(1);
    expect(mockRouter.navigate).toHaveBeenLastCalledWith(route);
  });

  it("should trigger the modal's open method once we call the onDeleteBusiness method and emits an event", () => {
    jest.spyOn(component.businessDeletion, 'emit');
    const modalRef = new ModalRef();
    jest.spyOn(modalRef, 'afterClosed', 'get').mockReturnValue(of(true));
    modalRef.close(true);
    jest.spyOn(mockModalService, 'open').mockReturnValue(modalRef);

    component.onDeleteBusiness();

    expect(mockModalService.open).toHaveBeenCalledTimes(1);
    expect(component.businessDeletion.emit).toHaveBeenCalledTimes(1);
    // PROVISIONAL, TO CHANGE IN A FUTURE
    expect(component.businessDeletion.emit).toHaveBeenLastCalledWith();
    // PROVISIONAL, TO CHANGE IN A FUTURE
  });
});
