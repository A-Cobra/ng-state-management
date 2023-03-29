import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalConfig, ModalRef } from '@clapp1/clapp-angular';
import { MockModalConfig } from '../../models/mock-modal-config.interface';
import { MockModalRef } from '../../models/mock-modal-ref.interface';
import { defaultConfirmationMessage } from '../../utils/default-confirmation-message';

import { ConfirmationModalComponent } from './confirmation-modal.component';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let mockModalRef: MockModalRef;
  let mockModalConfig: MockModalConfig;

  beforeEach(async () => {
    mockModalRef = {
      close: jest.fn(),
    };
    mockModalConfig = {
      data: defaultConfirmationMessage,
    };
    await TestBed.configureTestingModule({
      imports: [ConfirmationModalComponent],
      providers: [
        {
          provide: ModalRef,
          useValue: mockModalRef,
        },
        {
          provide: ModalConfig,
          useValue: mockModalConfig,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
