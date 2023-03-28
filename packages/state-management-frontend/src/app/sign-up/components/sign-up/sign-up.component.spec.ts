import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from '@clapp1/clapp-angular';
import { of } from 'rxjs';
import { UserI } from '../../interfaces/user.interface';
import { SignUpService } from '../../services/sign-up.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let formBuilder: FormBuilder;
  let titleService: Title;
  let signUpService: SignUpService;
  let router: Router;
  let notificationService: NotificationService;

  beforeEach(() => {
    formBuilder = new FormBuilder();
    titleService = new Title(document);
    signUpService = new SignUpService();
    router = { navigate: jest.fn() } as unknown as Router;
    notificationService = {
      success: jest.fn(),
      error: jest.fn(),
    } as unknown as NotificationService;
    component = new SignUpComponent(
      formBuilder,
      titleService,
      signUpService,
      router,
      notificationService
    );
  });

  describe('ngOnInit', () => {
    it('should initialize the form with empty fields', () => {
      component.ngOnInit();
      expect(component.signUpForm.value).toEqual({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        contactNumber: '',
        password: '',
        confirmPassword: '',
      });
    });

    it('should set the page title', () => {
      component.ngOnInit();
      expect(titleService.getTitle()).toEqual('Sign up');
    });
  });

  describe('onSubmit', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('should set passwordMismatch error if passwords do not match', () => {
      component.password?.setValue('password1');
      component.confirmPassword?.setValue('password2');
      component.onSubmit();
      expect(component.confirmPassword?.errors).toEqual({
        passwordMismatch: true,
      });
    });

    it('should not set passwordMismatch error if passwords match', () => {
      component.password?.setValue('password');
      component.confirmPassword?.setValue('password');
      component.onSubmit();
      expect(component.confirmPassword?.errors).toBeNull();
    });

    it('should call signUpService with user details and navigate to login page on success', () => {
      const user: UserI = {
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        contactNumber: '1234567890',
        password: 'password',
      };
      component.signUpForm.setValue({
        firstName: user.name,
        lastName: user.lastName,
        userName: user.username,
        email: user.email,
        contactNumber: user.contactNumber,
        password: user.password,
        confirmPassword: user.password,
      });
      jest.spyOn(signUpService, 'signUp').mockReturnValueOnce(of(true));

      component.onSubmit();

      expect(signUpService.signUp).toHaveBeenCalledWith(user);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should not navigate on failure', () => {
      const user: UserI = {
        name: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        contactNumber: '1234567890',
        password: 'password',
      };
      component.signUpForm.setValue({
        firstName: user.name,
        lastName: user.lastName,
        userName: user.username,
        email: user.email,
        contactNumber: user.contactNumber,
        password: user.password,
        confirmPassword: user.password,
      });
      jest.spyOn(signUpService, 'signUp').mockReturnValueOnce(of(false));

      component.onSubmit();

      expect(signUpService.signUp).toHaveBeenCalledWith(user);
      expect(router.navigate).not.toHaveBeenCalled();
    });
  });
});
