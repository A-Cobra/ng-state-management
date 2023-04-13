import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { activatedRouteMock, MOCK_CUSTOMER } from '../../test/mocks';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomersService } from '../../services/customers.service';
import { of } from 'rxjs';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappImageDisplayModule,
  ClappNoResultsModule,
  ClappPaginationModule,
  ClappSearchModule,
  ModalService,
} from '@clapp1/clapp-angular';
import { RouterTestingModule } from '@angular/router/testing';
import { backModalConfig, deleteModalConfig } from '../../utils/modal-config';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

const customerServiceMock = {
  getCustomer: jest.fn().mockReturnValue(of(MOCK_CUSTOMER)),
  getIsAdminInfo: jest.fn().mockReturnValue(of(true)),
  deleteCustomer: jest.fn().mockReturnValue(of(undefined)),
};

const modalServiceMock = {
  open: jest.fn(() => ({
    afterClosed: of(true),
  })),
};

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let customersService: CustomersService;
  let modalService: ModalService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerDetailsComponent],
      imports: [
        ClappCardModule,
        ClappButtonModule,
        ClappSearchModule,
        ClappNoResultsModule,
        ClappImageDisplayModule,
        ClappPaginationModule,
        RouterTestingModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: activatedRouteMock,
        },
        {
          provide: CustomersService,
          useValue: customerServiceMock,
        },
        {
          provide: ModalService,
          useValue: modalServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    customersService = TestBed.inject(CustomersService);
    modalService = TestBed.inject(ModalService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the variables customer, hasCustomer, isLoading, and isAdmin correctly.', () => {
    expect(component.customer).toEqual(MOCK_CUSTOMER);
    expect(component.hasCustomer).toBeTruthy();
    expect(component.isLoading).toBeFalsy();
    expect(component.isAdmin).toBeTruthy();
  });

  it('should get customer', () => {
    expect(customersService.getCustomer).toHaveBeenCalled();
  });

  it('should get isAdmin information', () => {
    expect(customersService.getIsAdminInfo).toHaveBeenCalled();
  });

  it('should navigate to customers page', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.onClickBack();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/customers']);
  });

  it('should delete the customer and navigate to /customers', () => {
    const deleteCustomerSpy = jest.spyOn(customersService, 'deleteCustomer');
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.deleteCustomer();

    expect(deleteCustomerSpy).toHaveBeenCalledWith(MOCK_CUSTOMER.id);
    expect(navigateSpy).toHaveBeenCalledWith(['/customers']);
  });

  describe('modals', () => {
    let openSpy: jest.SpyInstance;
    beforeEach(() => {
      openSpy = jest.spyOn(modalService, 'open');
      jest.clearAllMocks();
    });

    it('should open delete modal', () => {
      component.onClickDelete();
      expect(openSpy).toHaveBeenCalled();
      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        deleteModalConfig
      );
    });

    it('should open back modal', () => {
      component.onClickBack();
      expect(openSpy).toHaveBeenCalled();
      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        backModalConfig
      );
    });

    it('should navigate to /customers when clicking on the back button', () => {
      const navigateSpy = jest.spyOn(router, 'navigate');
      component.onClickBack();
      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        backModalConfig
      );
      expect(navigateSpy).toHaveBeenCalledWith(['/customers']);
    });
  });
});
