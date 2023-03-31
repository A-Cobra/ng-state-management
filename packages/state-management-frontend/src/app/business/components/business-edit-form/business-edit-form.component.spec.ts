import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '@clapp1/clapp-angular';
import { defaultBusinessClassificationBackendData } from '../../utils/default-business-classification-backend-data';
import { defaultBusinessData } from '../../../core/utils/default-business-data';
import { MockModalService } from '../../models/mock-modal-service.interface';

import { BusinessEditFormComponent } from './business-edit-form.component';

describe('BusinessEditFormComponent', () => {
  let component: BusinessEditFormComponent;
  let fixture: ComponentFixture<BusinessEditFormComponent>;
  let mockModalService: MockModalService;

  beforeEach(async () => {
    mockModalService = {
      open: jest.fn(),
      close: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [BusinessEditFormComponent],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BusinessEditFormComponent);
    component = fixture.componentInstance;
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
});
