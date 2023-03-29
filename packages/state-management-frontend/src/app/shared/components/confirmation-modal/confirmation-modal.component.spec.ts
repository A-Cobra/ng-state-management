import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import {
  ClappButtonModule,
  ClappNoResultsModule,
  ModalConfig,
  ModalModule,
  ModalRef,
} from '@clapp1/clapp-angular';
import { MOCK_MODAL_CONFIG } from '../../test/mocks';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;
  let modalRef: ModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [
        ConfirmationModalComponent,
        ModalModule,
        ClappButtonModule,
        ClappNoResultsModule,
      ],
      providers: [
        ModalRef,
        {
          provide: ModalConfig,
          useValue: MOCK_MODAL_CONFIG,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    modalRef = TestBed.inject(ModalRef);
  });

  it('should called modalRef in order to close with false value', () => {
    const spy = jest.spyOn(modalRef, 'close');
    component.onNoClick();

    expect(spy).toBeCalledWith(false);
  });

  it('should called modalRef in order to close with true value', () => {
    const spy = jest.spyOn(modalRef, 'close');
    component.onModalConfirmation();

    expect(spy).toBeCalledWith(true);
  });
});
