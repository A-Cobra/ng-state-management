import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '@clapp1/clapp-angular';
import { MockModalService } from '../../../business/models/mock-modal-service.interface';

import { InvalidFormModalComponent } from './invalid-form-modal.component';

describe('ModalInvalidFormComponent', () => {
  let component: InvalidFormModalComponent;
  let fixture: ComponentFixture<InvalidFormModalComponent>;
  let mockModalService: MockModalService;

  beforeEach(async () => {
    mockModalService = {
      open: jest.fn(),
      close: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [InvalidFormModalComponent],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvalidFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
