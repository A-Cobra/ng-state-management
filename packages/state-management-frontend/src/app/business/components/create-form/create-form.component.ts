import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { FormCreateGroup } from '../../models/create-form.interface';

import { ModalService, NotificationService } from '@clapp1/clapp-angular';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Observable } from 'rxjs';
import { BusinessService } from '../../services/business.service';
import { Classification } from '../../models/classification.interface';
import { BANK_ACCOUNT_TYPES } from '../../data/bank-account-types';
import { BankAccountType } from '../../models/bank-account-type.interface';

@Component({
  selector: 'state-management-app-business-create',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private notificationService: NotificationService,
    private modalService: ModalService,
    private router: Router
  ) {}

  createForm!: FormGroup;
  classification$!: Observable<Classification[]>;

  bankAccountTypes: BankAccountType[] = BANK_ACCOUNT_TYPES;
  loader = false;
  goBackConfirmed = false;
  unsubscribe$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.setUpForm();
    this.classification$ = this.businessService.getClassifications();
  }

  setUpForm(): void {
    this.createForm = this.fb.group<FormCreateGroup>({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-ZñÑ ]+$'),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,3}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$'
        ),
      ]),
      classification: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$'
        ),
      ]),
      latitude: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$'
        ),
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      picture: new FormControl(
        '',
        Validators.pattern('^(https://[^"]*?.jpg)$')
      ),
      bankAccountNumber: new FormControl(
        '',
        Validators.pattern('^[a-zA-Z0-9]+$')
      ),
      bankName: new FormControl(''),
      bankAccountType: new FormControl(''),
      fullname: new FormControl('', [Validators.required]),
      documentId: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
    });
  }

  clearEnableForm() {
    this.createForm.enable();
    this.createForm.reset();
  }
  onSubmit() {
    this.createForm.disable();
    this.loader = true;
    this.businessService.addNewBusiness(this.createForm.value).subscribe({
      next: () => {
        this.notificationService.success(
          'Business created successfully',
          'Success!'
        ),
          this.createForm.reset();
      },
      error: () =>
        this.notificationService.success(
          'Business created successfully',
          'Success!'
        ),
    });
    this.loader = false;
    this.createForm.enable();
  }
  handleGoBack() {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      data: {
        title: 'Create business',
        message: 'Are you sure to leave without saving changes?',
        confirmButtonLabel: 'Yes',
        cancelButtonLabel: 'Cancel',
      },
      width: '300px',
      height: 'fit-content',
    });
    modalRef.afterClosed.subscribe((result) => {
      this.loader = true;
      this.goBackConfirmed = result as boolean;
      if (this.goBackConfirmed) {
        this.router.navigate(['/businesses']);
      } else {
        this.loader = false;
      }
    });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
