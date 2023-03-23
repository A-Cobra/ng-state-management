import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'state-management-app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  loading = false;

  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      contactNumber: ['', Validators.required],
      password: ['', Validators.required, Validators.minLength(8)],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit(): void {
    alert('hola');
  }
}
