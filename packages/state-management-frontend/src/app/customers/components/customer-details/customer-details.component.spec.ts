import { ActivatedRoute, Router, Routes } from '@angular/router';
import { activatedRouteMock, MOCK_CUSTOMER } from '../../test/mocks';
import { backModalConfig, deleteModalConfig } from '../../utils/modal-config';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { CustomerDetailsComponent } from './customer-details.component';
import { CustomersService } from '../../services/customers.service';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

import {
  ClappButtonModule,
  ClappCardModule,
  ClappImageDisplayModule,
  ClappNoResultsModule,
  ClappNotificationModule,
  ClappPaginationModule,
  ClappSearchModule,
  ModalService,
  NotificationService,
} from '@clapp1/clapp-angular';

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

const notificationServiceMock = {
  success: jest.fn(),
  error: jest.fn(),
};

@Component({
  selector: 'app-customer-component',
  template: '<span> Mock Component </span>',
})
class MockCustomerComponent {}
const routes: Routes = [
  {
    path: 'customers',
    component: MockCustomerComponent,
  },
];

describe('CustomerDetailsComponent', () => {
  let component: CustomerDetailsComponent;
  let fixture: ComponentFixture<CustomerDetailsComponent>;
  let customersService: CustomersService;
  let modalService: ModalService;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let notificationService: NotificationService;
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
        ClappNotificationModule,
        RouterTestingModule.withRoutes(routes),
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
        {
          provide: NotificationService,
          useValue: notificationServiceMock,
        },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(CustomerDetailsComponent);
    component = fixture.componentInstance;
    customersService = TestBed.inject(CustomersService);
    notificationService = TestBed.inject(NotificationService);
    modalService = TestBed.inject(ModalService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve customer details successfully.', () => {
    expect(component.customer).toEqual(MOCK_CUSTOMER);
    expect(component.hasCustomer).toBeTruthy();
    expect(component.isLoading).toBeFalsy();
  });

  it('should retrieve admin status successfully.', () => {
    expect(customersService.getIsAdminInfo).toHaveBeenCalled();
    expect(component.isAdmin).toBeTruthy();
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

  it('should navigate to /customers', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.navigateToCustomers();
    expect(navigateSpy).toHaveBeenCalled();
    expect(navigateSpy).toHaveBeenCalledWith(['/customers']);
  });

  describe('notifications', () => {
    it('should show success notification when deleting customer', () => {
      const successSpy = jest.spyOn(notificationService, 'success');
      component.deleteCustomer();
      expect(successSpy).toHaveBeenCalled();
      expect(successSpy).toHaveBeenCalledWith(
        'Customer deleted successfully',
        'Success!'
      );
    });

    it('should show error notification when deleting customer', () => {
      const errorSpy = jest.spyOn(notificationService, 'error');
      jest
        .spyOn(customersService, 'deleteCustomer')
        .mockReturnValue(throwError({}));
      component.deleteCustomer();
      expect(errorSpy).toHaveBeenCalled();
      expect(errorSpy).toHaveBeenCalledWith(
        'Customer could not be deleted',
        'Unexpected error!'
      );
    });
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
