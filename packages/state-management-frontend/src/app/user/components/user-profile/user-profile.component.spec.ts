import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NotificationService } from '@clapp1/clapp-angular';
import { of, throwError } from 'rxjs';
import { UserProfileComponent } from './user-profile.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { TrimTextDirective } from '../../../shared/directives/trim-text.directive';
import { UserService } from '../../services/user.service';
import { routes, userMock } from '../../test/user.mocks';
import {
  ClappButtonModule,
  ClappInputHelpersModule,
  ClappTextInputModule,
  ModalService,
} from '@clapp1/clapp-angular';
import {
  backModalConfig,
  cancelModalConfig,
  saveChangesModalConfig,
} from '../../utils/user.modal-config';

const userServiceMock = {
  getUserProfile: jest.fn().mockReturnValue(of(userMock)),
  saveUserProfile: jest.fn().mockReturnValue(of(userMock)),
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

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;
  let modalService: ModalService;
  let notificationService: NotificationService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        LoaderComponent,
        ClappTextInputModule,
        ClappInputHelpersModule,
        ClappButtonModule,
        TrimTextDirective,
      ],
      declarations: [UserProfileComponent],
      providers: [
        {
          provide: UserService,
          useValue: userServiceMock,
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
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    modalService = TestBed.inject(ModalService);
    notificationService = TestBed.inject(NotificationService);
    TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should show loader while submitting form', () => {
    component.isSending = true;
    fixture.detectChanges();
    const loader = fixture.debugElement.query(By.css('app-loader'));
    expect(loader).toBeTruthy();
  });

  it('should initialize the form', () => {
    const userInfo = {
      ...component.userProfile,
      name: component.profileForm.get('name')?.value.trim(),
      lastname: component.profileForm.get('lastname')?.value.trim(),
      contactNumber: component.profileForm.get('contactNumber')?.value.trim(),
      email: component.profileForm.get('email')?.value.trim(),
    };

    expect(userInfo).toStrictEqual(userMock);
    expect(component.profileForm.disabled).toBe(true);
  });

  it('should enable the form when clicking edit', () => {
    component.onClickEdit();
    expect(component.profileForm.enabled).toBe(true);
  });

  it('should save user profile', () => {
    component.onClickEdit();
    component.profileForm.setValue({
      name: 'Jane',
      lastname: 'Doe',
      contactNumber: '987654321',
      email: 'janedoe@test.com',
    });
    component.onClickSave();
    expect(userService.saveUserProfile).toHaveBeenCalled();
    expect(component.isSending).toBe(false);
    expect(component.isEditing).toBe(false);
    expect(component.profileForm.disabled).toBe(true);
    expect(component.userProfile).toEqual(userMock);
  });

  describe('should display inputs', () => {
    it('should display the name input', () => {
      const nameInput = fixture.debugElement.query(By.css('#nameInput'));
      expect(nameInput).toBeTruthy();
    });

    it('should display the last name input', () => {
      const lastnameInput = fixture.debugElement.query(
        By.css('#lastnameInput')
      );
      expect(lastnameInput).toBeTruthy();
    });

    it('should display the email input', () => {
      const emailInput = fixture.debugElement.query(By.css('#emailInput'));
      expect(emailInput).toBeTruthy();
    });

    it('should display the contact number input', () => {
      const contactNumberInput = fixture.debugElement.query(
        By.css('#contactNumberInput')
      );
      expect(contactNumberInput).toBeTruthy();
    });
  });

  describe('display form fields and errors', () => {
    beforeEach(() => {
      component.onClickEdit();
    });

    it('should display the name required error', () => {
      const nameControl = component.getControl('name');
      nameControl.setValue('');
      nameControl.markAsDirty();
      fixture.detectChanges();

      const nameRequiredError = fixture.debugElement.query(
        By.css('#nameInputRequiredError')
      );

      expect(nameRequiredError).toBeTruthy();
      expect(nameRequiredError.nativeElement.textContent.trim()).toBe(
        'This field is required.'
      );
      expect(nameControl.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(nameControl.hasError('required')).toBe(true);
    });

    it('should display the name pattern error', () => {
      const nameControl = component.getControl('name');
      nameControl.setValue('1234');
      nameControl.markAsDirty();
      fixture.detectChanges();

      const namePatternError = fixture.debugElement.query(
        By.css('#nameInputPatternError')
      );

      expect(namePatternError).toBeTruthy();
      expect(namePatternError.nativeElement.textContent.trim()).toBe(
        'This field must contain only letters.'
      );
      expect(nameControl.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(nameControl.hasError('pattern')).toBe(true);
    });

    it('should display the lastname required error', () => {
      const lastName = component.getControl('lastname');
      lastName.setValue('');
      lastName.markAsDirty();
      fixture.detectChanges();

      const lastNameInputRequiredError = fixture.debugElement.query(
        By.css('#lastnameInputRequiredError')
      );

      expect(lastNameInputRequiredError).toBeTruthy();
      expect(lastNameInputRequiredError.nativeElement.textContent.trim()).toBe(
        'This field is required.'
      );
      expect(lastName.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(lastName.hasError('required')).toBe(true);
    });

    it('should display the lastName pattern error', () => {
      const lastNameControl = component.getControl('lastname');
      lastNameControl.setValue('1234');
      lastNameControl.markAsDirty();
      fixture.detectChanges();

      const lastNamePatternError = fixture.debugElement.query(
        By.css('#lastnameInputPatternError')
      );

      expect(lastNamePatternError).toBeTruthy();
      expect(lastNamePatternError.nativeElement.textContent.trim()).toBe(
        'This field must contain only letters.'
      );
      expect(lastNameControl.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(lastNameControl.hasError('pattern')).toBe(true);
    });

    it('should display the email required error', () => {
      const email = component.getControl('email');
      email.setValue('');
      email.markAsDirty();
      fixture.detectChanges();

      const emailInputRequiredError = fixture.debugElement.query(
        By.css('#emailInputRequiredError')
      );

      expect(emailInputRequiredError).toBeTruthy();
      expect(emailInputRequiredError.nativeElement.textContent.trim()).toBe(
        'This field is required.'
      );
      expect(email.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(email.hasError('required')).toBe(true);
    });

    it('should display the email pattern error', () => {
      const emailControl = component.getControl('email');
      emailControl.setValue('invalidEmail');
      emailControl.markAsDirty();
      fixture.detectChanges();

      const emailPatternError = fixture.debugElement.query(
        By.css('#emailInputPatternError')
      );

      expect(emailPatternError).toBeTruthy();
      expect(emailPatternError.nativeElement.textContent.trim()).toBe(
        'This field must contain a valid email.'
      );
      expect(emailControl.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(emailControl.hasError('pattern')).toBe(true);
      expect(emailControl.hasError('email')).toBe(true);
    });

    it('should display the contactNumber required error', () => {
      const contactNumber = component.getControl('contactNumber');
      contactNumber.setValue('');
      contactNumber.markAsDirty();
      fixture.detectChanges();

      const phoneNumberInputRequiredError = fixture.debugElement.query(
        By.css('#contactNumberInputRequiredError')
      );

      expect(phoneNumberInputRequiredError).toBeTruthy();
      expect(
        phoneNumberInputRequiredError.nativeElement.textContent.trim()
      ).toBe('This field is required.');
      expect(contactNumber.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(contactNumber.hasError('required')).toBe(true);
    });

    it('should display the contactNumber pattern error', () => {
      const contactNumberControl = component.getControl('contactNumber');
      contactNumberControl.setValue('invalidcontactNumber');
      contactNumberControl.markAsDirty();
      fixture.detectChanges();

      const contactNumberPatternError = fixture.debugElement.query(
        By.css('#contactNumberInputPatternError')
      );

      expect(contactNumberPatternError).toBeTruthy();
      expect(contactNumberPatternError.nativeElement.textContent.trim()).toBe(
        'This field must contain only numbers. 0-9'
      );
      expect(contactNumberControl.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(contactNumberControl.hasError('pattern')).toBe(true);
    });
  });

  describe('save changes modal', () => {
    it('should open save changes modal when clicking save button', () => {
      const openSpy = jest.spyOn(modalService, 'open');
      const saveChangesSpy = jest.spyOn(component, 'saveChanges');
      const saveChangesModalSpy = jest.spyOn(component, 'saveChangesModal');
      component.onClickEdit();
      component.onClickSave();

      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        saveChangesModalConfig
      );
      expect(saveChangesSpy).toHaveBeenCalled();
      expect(saveChangesModalSpy).toHaveBeenCalled();
    });
  });

  describe('backModal', () => {
    it('should open a confirmation modal with the correct parameters and navigate to home', () => {
      const openSpy = jest.spyOn(modalService, 'open');
      const backModalSpy = jest.spyOn(component, 'getBackModal');
      const navigateSpy = jest.spyOn(router, 'navigate');
      component.onClickBack();

      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        backModalConfig
      );
      expect(backModalSpy).toHaveBeenCalled();
      expect(navigateSpy).toHaveBeenCalledWith(['']);
    });
  });

  describe('cancelModal', () => {
    it('should open a confirmation modal with the correct parameters for cancel button', () => {
      const openSpy = jest.spyOn(modalService, 'open');
      const cancelModalSpy = jest.spyOn(component, 'getCancelModal');
      component.onClickCancel();

      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        cancelModalConfig
      );
      expect(cancelModalSpy).toHaveBeenCalled();
    });
  });

  describe('NotificationService', () => {
    it('should show success notification', () => {
      const successSpy = jest.spyOn(notificationService, 'success');
      component.onClickEdit();
      component.profileForm.patchValue({
        phoneNumber: '1234567890',
      });
      component.onClickSave();

      expect(successSpy).toHaveBeenCalledWith(
        'User profile updated successfully',
        'Success!'
      );
    });

    it('should show error notification', () => {
      jest
        .spyOn(userService, 'saveUserProfile')
        .mockReturnValue(
          throwError('An error has occurred while updating the user profile')
        );

      const errorSpy = jest.spyOn(notificationService, 'error');

      component.onClickEdit();
      component.profileForm.patchValue({
        phoneNumber: '1234567890',
      });
      component.onClickSave();

      expect(errorSpy).toHaveBeenCalledWith(
        'An error has occurred while updating the user profile',
        'Unexpected error!'
      );
    });
  });
});
