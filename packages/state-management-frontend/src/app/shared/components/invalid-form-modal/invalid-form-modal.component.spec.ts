import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ModalService } from '@clapp1/clapp-angular';
import { MockModalService } from '../../../business/models/mock-modal-service.interface';

import { InvalidFormModalComponent } from './invalid-form-modal.component';

describe('ModalInvalidFormComponent', () => {
  let component: InvalidFormModalComponent;
  let fixture: ComponentFixture<InvalidFormModalComponent>;
  let debugElement: DebugElement;
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
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should trigger the close method from the modalService once we click the clapp button', () => {
    const clappButton = debugElement.query(By.css('clapp-button'));
    clappButton.triggerEventHandler('click', null);

    expect(mockModalService.close).toHaveBeenCalledTimes(1);
    expect(mockModalService.close).toHaveBeenCalledWith();
  });
});
