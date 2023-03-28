import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormCreateMainGroup } from '../../models/create-form.interface';

import { ModalService } from '@clapp1/clapp-angular';
import { ModalGoBackComponent } from '../../../core/components/modal-go-back/modal-go-back.component';

@Component({
  selector: 'state-management-app-business-create',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  title = 'state-management-frontend-business-create';
  constructor(private fb: FormBuilder, private modalService: ModalService) {}

  createForm!: FormGroup;

  classifications = [
    { key: '1', name: 'Burger' },
    { key: '2', name: 'Pasta' },
    { key: '3', name: 'Salad' },
  ];

  bankAccountTypes = [
    {
      key: '1',
      name: 'Checking account',
      description: 'unlimited access to the money without earning interest',
    },
    {
      key: '2',
      name: 'Savings account',
      description: 'No constant access to the money but with nominal interest',
    },
    {
      key: '3',
      name: 'Money market account',
      description:
        'Blend between a checking and savings account, with access to the money once per month',
    },
    {
      key: '4',
      name: 'Certificate of deposit (CD)',
      description: 'A secure way to invest the money for a set period of time',
    },
    {
      key: '5',
      name: 'Individual retirement arrangement (IRA)',
      description:
        'A tax-deductible or tax-deferred way to invest the money for retirement',
    },
    {
      key: '6',
      name: 'Brokerage account',
      description:
        'Invest the money without penalization for taking it out before the age of 59½',
    },
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
      bankAccountNumber: ['', Validators.pattern('^[a-zA-Z0-9]+$')],
      bankName: '',
      bankAccountType: '',
      fullname: ['', [Validators.required]],
      documentId: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    });
  }

  clearEnableForm() {
    this.createForm.enable();
    this.createForm.reset();
  }
  handleSubmit() {
    this.createForm.disable();
    alert('SUBMIT');
    this.clearEnableForm();
  }
  handleCancel() {
    this.modalService.open(ModalGoBackComponent, {
      data: '',
      width: '400px',
      height: '190px',
      disableBackdropClose: false,
    });
  }
}
