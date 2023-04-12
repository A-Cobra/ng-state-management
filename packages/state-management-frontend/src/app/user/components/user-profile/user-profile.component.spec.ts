import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ClappButtonModule,
  ClappInputHelpersModule,
  ClappTextInputModule,
  ModalService,
} from '@clapp1/clapp-angular';

import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { UserService } from '../../services/user.service';
import { mockUser, modalServiceMock, userServiceMock } from '../../test/mocks';
import {
  backModalConfig,
  cancelModalConfig,
  saveChangesModalConfig,
} from '../../utils/modal-config';
import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;
  let userService: UserService;
  let modalService: ModalService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        LoaderComponent,
        ClappTextInputModule,
        ClappInputHelpersModule,
        ClappButtonModule,
      ],
      declarations: [UserProfileComponent],
      providers: [
        RouterTestingModule,
        {
          provide: UserService,
          useValue: userServiceMock,
        },
        {
          provide: ModalService,
          useValue: modalServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    modalService = TestBed.inject(ModalService);
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
    expect({
      ...component.profileForm.value,
      id: component.userProfile?.id,
    }).toStrictEqual(mockUser);
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
      lastName: 'Doe',
      phoneNumber: '987654321',
      email: 'janedoe@test.com',
    });
    component.onClickSave();
    expect(userService.saveUserProfile).toHaveBeenCalled();
    expect(component.isSending).toBe(false);
    expect(component.isEditing).toBe(false);
    expect(component.profileForm.disabled).toBe(true);
    expect(component.userProfile).toEqual(mockUser);
  });

  describe('should display inputs', () => {
    it('should display the name input', () => {
      const nameInput = fixture.debugElement.query(By.css('#nameInput'));
      expect(nameInput).toBeTruthy();
    });

    it('should display the last name input', () => {
      const lastNameInput = fixture.debugElement.query(
        By.css('#lastNameInput')
      );
      expect(lastNameInput).toBeTruthy();
    });

    it('should display the email input', () => {
      const emailInput = fixture.debugElement.query(By.css('#emailInput'));
      expect(emailInput).toBeTruthy();
    });

    it('should display the phone number input', () => {
      const phoneNumberInput = fixture.debugElement.query(
        By.css('#phoneNumberInput')
      );
      expect(phoneNumberInput).toBeTruthy();
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

    it('should display the lastName required error', () => {
      const lastName = component.getControl('lastName');
      lastName.setValue('');
      lastName.markAsDirty();
      fixture.detectChanges();

      const lastNameInputRequiredError = fixture.debugElement.query(
        By.css('#lastNameInputRequiredError')
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
      const lastNameControl = component.getControl('lastName');
      lastNameControl.setValue('1234');
      lastNameControl.markAsDirty();
      fixture.detectChanges();

      const lastNamePatternError = fixture.debugElement.query(
        By.css('#lastNameInputPatternError')
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

    it('should display the phone number required error', () => {
      const phoneNumber = component.getControl('phoneNumber');
      phoneNumber.setValue('');
      phoneNumber.markAsDirty();
      fixture.detectChanges();

      const phoneNumberInputRequiredError = fixture.debugElement.query(
        By.css('#phoneNumberInputRequiredError')
      );

      expect(phoneNumberInputRequiredError).toBeTruthy();
      expect(
        phoneNumberInputRequiredError.nativeElement.textContent.trim()
      ).toBe('This field is required.');
      expect(phoneNumber.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(phoneNumber.hasError('required')).toBe(true);
    });

    it('should display the phoneNumber pattern error', () => {
      const phoneNumberControl = component.getControl('phoneNumber');
      phoneNumberControl.setValue('invalidphoneNumber');
      phoneNumberControl.markAsDirty();
      fixture.detectChanges();

      const phoneNumberPatternError = fixture.debugElement.query(
        By.css('#phoneNumberInputPatternError')
      );

      expect(phoneNumberPatternError).toBeTruthy();
      expect(phoneNumberPatternError.nativeElement.textContent.trim()).toBe(
        'This field must contain only numbers. 0-9'
      );
      expect(phoneNumberControl.pristine).toBe(false);
      expect(component.profileForm.disabled).toBe(false);
      expect(phoneNumberControl.hasError('pattern')).toBe(true);
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
    it('should open a confirmation modal with the correct parameters', () => {
      const openSpy = jest.spyOn(modalService, 'open');
      const backModalSpy = jest.spyOn(component, 'backModal');
      component.onClickBack();

      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        backModalConfig
      );
      expect(backModalSpy).toHaveBeenCalled();
    });
  });

  describe('cancelModal', () => {
    it('should open a confirmation modal with the correct parameters for cancel button', () => {
      const openSpy = jest.spyOn(modalService, 'open');
      const cancelModalSpy = jest.spyOn(component, 'cancelModal');
      component.onClickCancel();

      expect(openSpy).toHaveBeenCalledWith(
        ConfirmationModalComponent,
        cancelModalConfig
      );
      expect(cancelModalSpy).toHaveBeenCalled();
    });
  });
});
