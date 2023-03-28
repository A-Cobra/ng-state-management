import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappTextInputModule,
  NotificationService,
} from '@clapp1/clapp-angular';
import { of } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { SignUpService } from '../../services/sign-up.service';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let titleService: Title;
  let signUpService: SignUpService;
  let router: Router;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const notificationServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [SignUpComponent],
      imports: [
        ReactiveFormsModule,
        ClappCardModule,
        ClappButtonModule,
        ClappTextInputModule,
      ],
      providers: [
        FormBuilder,
        Title,
        SignUpService,
        {
          provide: NotificationService,
          useValue: notificationServiceMock,
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn() },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    signUpService = TestBed.inject(SignUpService);
    router = TestBed.inject(Router);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should initialize the form with empty fields', () => {
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
      const user: User = {
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
      const user: User = {
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

    it('should show success message on success', () => {
      const user: User = {
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
      const successSpy = jest.spyOn(notificationService, 'success');
      component.onSubmit();
      expect(successSpy).toHaveBeenCalled();
    });

    it('should show error message on failure', () => {
      const user: User = {
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
      const successSpy = jest.spyOn(notificationService, 'error');
      component.onSubmit();
      expect(successSpy).toHaveBeenCalled();
    });
  });
});
