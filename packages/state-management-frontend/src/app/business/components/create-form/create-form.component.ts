import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormCreateMainGroup } from '../../models/create-form.interface';

@Component({
  selector: 'state-management-app-business-create',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  title = 'state-management-frontend-business-create';
  constructor(private fb: FormBuilder) {}

  form!: FormGroup;
  createForm!: FormGroup;

  classifications = [
    { key: '1', name: 'Burger', disabled: false },
    { key: '2', name: 'Pasta', disabled: false },
    { key: '3', name: 'Salad', disabled: false },
  ];

  ngOnInit(): void {
    this.setUpForm();
  }

  setUpForm(): void {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZñÑ ]+$')]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$'
          ),
        ],
      ],
      classification: ['', [Validators.required]],
      address: ['', [Validators.required]],
      longitude: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$'
          ),
        ],
      ],
      latitude: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$'
          ),
        ],
      ],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      picture: ['', Validators.pattern('^(https://[^"]*?.jpg)$')],
    });

    this.form = this.fb.group<FormCreateMainGroup>({
      nameEmailPassword: this.fb.nonNullable.group({
        name: ['', [Validators.required, Validators.maxLength(25)]],
        representativeName: [
          '',
          [Validators.required, Validators.maxLength(25)],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'
            ),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+])[A-Za-zd!@#$%^&*()_+]{8,}$'
            ),
          ],
        ],
      }),
      classification: this.fb.nonNullable.group({
        classification: ['', [Validators.required]],
      }),
      addressCoordinatesContact: this.fb.nonNullable.group({
        address: ['', [Validators.required]],
        longitude: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
        latitude: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
        contact: ['', [Validators.required, Validators.pattern('^[0-9 ]+$')]],
      }),
      optionalFields: this.fb.group({
        picture: ['', Validators.pattern('^(https://[^"]*?.jpg)$')],
        bankAccountNumber: ['', Validators.pattern('^[0-9]{8,20}$')],
        bankName: '',
        bankAccountType: 'Account Type',
        fullname: '',
        documentId: 'Document ID',
      }),
    });
  }
}
