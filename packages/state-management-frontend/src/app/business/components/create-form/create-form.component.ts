import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { ModalService, NotificationService } from '@clapp1/clapp-angular';
import { BusinessService } from '../../services/business.service';
import {
  FormCreateGroup,
  FormControlsData,
} from '../../models/create-form.interface';
import { Classification } from '../../models/classification.interface';
import { BankAccountType } from '../../models/bank-account-type.interface';
import { FORM_CONTROLS_DATA } from '../../utils/form-controls-data';
import { BANK_ACCOUNT_TYPES } from '../../utils/bank-account-types';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'state-management-app-business-create',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: FormBuilder,
    private businessService: BusinessService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  createForm!: FormGroup;
  classification$!: Observable<Classification[]>;
  unsubscribe$: Subject<void> = new Subject<void>();
  formControlsData: FormControlsData = FORM_CONTROLS_DATA;
  bankAccountTypes: BankAccountType[] = BANK_ACCOUNT_TYPES;
  isLoading = false;
  goingBackConfirmed = false;

  ngOnInit(): void {
    this.setUpForm();
    this.classification$ = this.businessService.getClassifications();
  }

  setUpForm(): void {
    this.createForm = this.fb.group<FormCreateGroup>({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(this.formControlsData['name'].pattern),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(this.formControlsData['email'].pattern),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(this.formControlsData['password'].pattern),
      ]),
      classification: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      longitude: new FormControl('', [
        Validators.required,
        Validators.pattern(this.formControlsData['longitude'].pattern),
      ]),
      latitude: new FormControl('', [
        Validators.required,
        Validators.pattern(this.formControlsData['latitude'].pattern),
      ]),
      contact: new FormControl('', [
        Validators.required,
        Validators.pattern(this.formControlsData['contact'].pattern),
      ]),
      picture: new FormControl(
        '',
        Validators.pattern(this.formControlsData['picture'].pattern)
      ),
      bankAccountNumber: new FormControl(
        '',
        Validators.pattern(this.formControlsData['bankAccountNumber'].pattern)
      ),
      bankName: new FormControl(''),
      bankAccountType: new FormControl(''),
      fullname: new FormControl('', [Validators.required]),
      documentId: new FormControl('', [
        Validators.required,
        Validators.pattern(this.formControlsData['documentId'].pattern),
      ]),
    });
  }

  onSubmit() {
    this.createForm.disable();
    this.isLoading = true;
    this.businessService.addNewBusiness(this.createForm.value).subscribe({
      next: () => {
        this.notificationService.success(
          'Business created successfully',
          'Success!'
        ),
          this.createForm.reset();
        this.isLoading = false;
        this.createForm.enable();
      },
      error: () =>
        this.notificationService.error(
          'Error creating new business, please try again later',
          'Error! '
        ),
    });
  }

  handleGoBack() {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      data: {
        title: 'Create business',
        message: 'Are you sure you want to leave? Changes have not been saved',
        confirmButtonLabel: 'LEAVE',
        cancelButtonLabel: 'CANCEL',
      },
      width: 'fit-content',
      height: 'fit-content',
    });
    modalRef.afterClosed.subscribe((result) => {
      this.isLoading = true;
      this.goingBackConfirmed = result as boolean;
      if (this.goingBackConfirmed) {
        this.router.navigate(['/businesses']); //TODO: update to businesses profile route
      } else {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
