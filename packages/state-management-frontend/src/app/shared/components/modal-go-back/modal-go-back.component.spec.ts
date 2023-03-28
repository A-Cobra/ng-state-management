import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from '@clapp1/clapp-angular';
import { MockModalService } from '../../../business/models/mock-modal-service.interface';

import { ModalGoBackComponent } from './modal-go-back.component';

describe('ModalSureToLeaveComponent', () => {
  let component: ModalGoBackComponent;
  let fixture: ComponentFixture<ModalGoBackComponent>;
  let mockModalService: MockModalService;

  beforeEach(async () => {
    mockModalService = {
      open: jest.fn(),
      close: jest.fn(),
    };
    await TestBed.configureTestingModule({
      imports: [ModalGoBackComponent],
      providers: [
        {
          provide: ModalService,
          useValue: mockModalService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
