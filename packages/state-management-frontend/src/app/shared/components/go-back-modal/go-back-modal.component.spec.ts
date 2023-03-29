import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '@clapp1/clapp-angular';
import { MockModalService } from '../../../business/models/mock-modal-service.interface';

import { GoBackModalComponent } from './go-back-modal.component';

describe('ModalSureToLeaveComponent', () => {
  let component: GoBackModalComponent;
  let fixture: ComponentFixture<GoBackModalComponent>;
  let mockModalService: MockModalService;

  beforeEach(async () => {
    mockModalService = {
      open: jest.fn(),
      close: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [GoBackModalComponent],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(GoBackModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
