import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  ClappButtonModule,
  ClappImageDisplayModule,
  ModalService,
} from '@clapp1/clapp-angular';
import { defaultBusinessClassificationBackendData } from '../../utils/default-business-classification-backend-data';
import { MockModalService } from '../../models/mock-modal-service.interface';

import { BusinessEditFormComponent } from './business-edit-form.component';
import { defaultBusinessData } from '../../utils/default-business-data';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormControlTextInputComponent } from '../../../shared/components/reactive-form-control-text-input/reactive-form-control-text-input.component';
import { isALoadableImageUrl } from '../../../core/utils/is-a-displayable-image-url';

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
        ReactiveFormControlTextInputComponent,
      ],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
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
});
