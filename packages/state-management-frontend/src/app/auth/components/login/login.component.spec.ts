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
import { LoginComponent } from './login.component';
import { MOCK_USER_LOGIN } from '../../test/mocks';
import { LoginService } from '../../services/login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let titleService: Title;
  let loginService: LoginService;
  let router: Router;
  let notificationService: NotificationService;

  beforeEach(async () => {
    const notificationServiceMock = {
      success: jest.fn(),
      error: jest.fn(),
    };
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        ClappCardModule,
        ClappButtonModule,
        ClappTextInputModule,
      ],
      providers: [
        FormBuilder,
        Title,
        LoginService,
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    titleService = TestBed.inject(Title);
    loginService = TestBed.inject(LoginService);
    router = TestBed.inject(Router);
    notificationService = TestBed.inject(NotificationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should initialize loginForm correctly', () => {
      expect(component.loginForm).toBeDefined();
      expect(component.loginForm.get('email')).toBeDefined();
      expect(component.loginForm.get('password')).toBeDefined();
    });

    it('should initialize the form with empty fields', () => {
      expect(component.loginForm.value).toEqual({
        email: '',
        password: '',
      });
    });

    it('should set the page title', () => {
      expect(titleService.getTitle()).toEqual('Login');
    });

    it('should get email and password values correctly', () => {
      component.loginForm.setValue({
        email: 'test@test.com',
        password: 'Test@123',
      });
      expect(component.email?.value).toBe('test@test.com');
      expect(component.password?.value).toBe('Test@123');
    });

    it('should call loginService.login and router.navigate when form is submitted', () => {
      jest.spyOn(loginService, 'login').mockReturnValue(of(true));
      const navigateSpy = jest.spyOn(router, 'navigate');
      component.loginForm.setValue({
        email: 'test@test.com',
        password: 'Test@123',
      });
      component.onSubmit();
      expect(loginService.login).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'Test@123',
      });
      expect(navigateSpy).toHaveBeenCalledWith(['/']);
    });

    it('should show success notification when login is successful', () => {
      jest.spyOn(loginService, 'login').mockReturnValue(of(true));
      const successSpy = jest.spyOn(notificationService, 'success');
      component.loginForm.setValue({
        email: 'test@test.com',
        password: 'Test@123',
      });
      component.onSubmit();
      expect(successSpy).toHaveBeenCalledWith(
        'User logged succesfully',
        'Success!'
      );
    });

    it('should show error notification when login fails', () => {
      jest.spyOn(loginService, 'login').mockReturnValue(throwError('error'));
      const errorSpy = jest.spyOn(notificationService, 'error');
      component.loginForm.setValue({
        email: 'test@test.com',
        password: 'Test@123',
      });
      component.onSubmit();
      expect(errorSpy).toHaveBeenCalledWith(
        'There was an error when login.',
        'Unexpected error'
      );
    });
  });
});
