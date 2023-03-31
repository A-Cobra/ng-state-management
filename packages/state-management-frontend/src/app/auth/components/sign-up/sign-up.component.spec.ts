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
import { of, throwError } from 'rxjs';
import { MOCK_USER } from '../../mocks/mock-user';
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
      component.signUpForm.setValue({
        firstName: MOCK_USER.name,
        lastName: MOCK_USER.lastName,
        userName: MOCK_USER.username,
        email: MOCK_USER.email,
        contactNumber: MOCK_USER.contactNumber,
        password: MOCK_USER.password,
        confirmPassword: MOCK_USER.password,
      });
    });

    it('should set passwordMismatch error if passwords do not match', () => {
      component.password?.setValue('password1');
      component.confirmPassword?.setValue('password2');
      expect(component.confirmPassword?.errors).toEqual({
        passwordMismatch: true,
      });
    });

    it('should not set passwordMismatch error if passwords match', () => {
      component.password?.setValue('password');
      component.confirmPassword?.setValue('password');
      expect(component.confirmPassword?.errors).toBeNull();
    });

    it('should call signUpService with user details and navigate to login page on success', () => {
      jest.spyOn(signUpService, 'signUp').mockReturnValueOnce(of(true));

      component.onSubmit();

      expect(signUpService.signUp).toHaveBeenCalledWith(MOCK_USER);
      expect(router.navigate).toHaveBeenCalledWith(['/login']);
    });

    it('should not navigate on failure', () => {
      jest
        .spyOn(signUpService, 'signUp')
        .mockReturnValueOnce(throwError(() => new Error()));

      component.onSubmit();

      expect(signUpService.signUp).toHaveBeenCalledWith(MOCK_USER);
      expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should show success message on success', () => {
      jest.spyOn(signUpService, 'signUp').mockReturnValueOnce(of(true));
      const successSpy = jest.spyOn(notificationService, 'success');
      component.onSubmit();
      expect(successSpy).toHaveBeenCalled();
    });

    it('should show error message on failure', () => {
      jest
        .spyOn(signUpService, 'signUp')
        .mockReturnValueOnce(throwError(() => new Error()));
      const errorSpy = jest.spyOn(notificationService, 'error');
      component.onSubmit();
      expect(errorSpy).toHaveBeenCalled();
    });
  });
});
