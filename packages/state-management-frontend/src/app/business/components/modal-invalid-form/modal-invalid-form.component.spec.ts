import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '@clapp1/clapp-angular';
import { MockModalService } from '../../models/mock-modal-service.interface';

import { ModalInvalidFormComponent } from './modal-invalid-form.component';

describe('ModalInvalidFormComponent', () => {
  let component: ModalInvalidFormComponent;
  let fixture: ComponentFixture<ModalInvalidFormComponent>;
  let mockModalService: MockModalService;

  beforeEach(async () => {
    mockModalService = {
      open: jest.fn(),
      close: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [ModalInvalidFormComponent],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInvalidFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
