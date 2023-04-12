import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from '@clapp1/clapp-angular';
import { UserLogin } from '../../interfaces/user.model';
import { LoginService } from '../../services/login.service';
import { validPassword } from '../../validators/valid-password.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private titleService: Title,
    private router: Router,
    private loginService: LoginService,
    private notification: NotificationService
  ) {
    this.titleService.setTitle('Login');
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required], [validPassword]],
    });
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;
    const user: UserLogin = {
      email: this.email?.value.trim(),
      password: this.password?.value,
    };

    this.isLoading = true;
    this.loginService.login(user).subscribe({
      next: () => {
        this.isLoading = false;
        this.notification.success('User logged succesfully', 'Success!');
        this.router.navigate(['/']);
      },
      error: () => {
        this.isLoading = false;
        this.notification.error(
          'There was an error when login.',
          'Unexpected error'
        );
      },
    });
  }
}
