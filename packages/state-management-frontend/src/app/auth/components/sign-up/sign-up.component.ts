import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NotificationService } from '@clapp1/clapp-angular';
import { User } from '../../interfaces/user.interface';
import { SignUpService } from '../../services/sign-up.service';
import { notEmpty } from '../../validators/not-empty.validator';
import { passwordMatch } from '../../validators/password-match.validator';
import { validPassword } from '../../validators/valid-password.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;

  constructor(
    private readonly formBuilder: FormBuilder,
    private titleService: Title,
    private signUpService: SignUpService,
    private router: Router,
    private notification: NotificationService
  ) {
    this.titleService.setTitle('Sign up');
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required], [notEmpty]],
      lastName: ['', [Validators.required], [notEmpty]],
      userName: ['', [Validators.required], [notEmpty]],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      password: ['', [Validators.required], [validPassword]],
      confirmPassword: ['', [Validators.required], [passwordMatch]],
    });
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get userName() {
    return this.signUpForm.get('userName');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get contactNumber() {
    return this.signUpForm.get('contactNumber');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  onSubmit(): void {
    const user: User = {
      name: this.firstName?.value.trim(),
      lastName: this.lastName?.value.trim(),
      username: this.userName?.value.trim(),
      email: this.email?.value.trim(),
      password: this.password?.value,
      contactNumber: this.contactNumber?.value,
    };

    this.loading = true;

    this.signUpService.signUp(user).subscribe({
      next: () => {
        this.loading = false;
        this.notification.success(
          'User created succesfully, try login in.',
          'Success!'
        );
        this.router.navigate(['/login']);
      },
      error: () => {
        this.loading = false;
        this.notification.error(
          'There was an error when creating the user.',
          'Unexpected error'
        );
      },
    });
  }
}
