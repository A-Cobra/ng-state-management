import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take, Observable, debounceTime, Subject, takeUntil } from 'rxjs';
import { ModalService, NotificationService } from '@clapp1/clapp-angular';
import { BusinessService } from '../../services/business.service';
import { FormControlsData } from '../../models/create-form.interface';
import { Classification } from '../../models/classification.interface';
import { BankAccountType } from '../../models/bank-account-type.interface';
import { FORM_CONTROLS_DATA } from '../../utils/form-controls-data';
import { BANK_ACCOUNT_TYPES } from '../../utils/bank-account-types';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { createFormControlFields } from '../../utils/create-form-control-fields';
import { Business } from '../../models/business.interface';
import { isALoadableImageUrl } from '../../../core/utils/is-a-displayable-image-url';

@Component({
  selector: 'app-business-create',
  templateUrl: './business-create-form.component.html',
  styleUrls: ['./business-create-form.component.scss'],
})
export class BusinessCreateFormComponent implements OnInit, OnDestroy {
  constructor(
    private fb: NonNullableFormBuilder,
    private businessService: BusinessService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  createForm = this.fb.group(createFormControlFields);
  classification$!: Observable<Classification[]>;
  formControlsData: FormControlsData = FORM_CONTROLS_DATA;
  bankAccountTypes: BankAccountType[] = BANK_ACCOUNT_TYPES;
  isLoading = false;
  goingBackConfirmed = false;
  currentBusinessImgUrl = '';
  defaultImgUrl = 'assets/template-image.png';
  unsubscribeAll$ = new Subject<string>();

  ngOnInit(): void {
    this.resetForm();
    this.setupImgUrlDebounce();
    this.classification$ = this.businessService.getClassifications();
  }

  ngOnDestroy(): void {
    this.unsubscribeAll$.next('');
    this.unsubscribeAll$.unsubscribe();
  }

  onSubmit(): void {
    this.createForm.disable();
    this.isLoading = true;
    this.businessService
      .addNewBusiness(this.createForm.value as Business)
      .subscribe({
        next: () => {
          this.notificationService.success(
            'Business created successfully',
            'Success!'
          );
          this.resetForm();
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

  handleGoBack(): void {
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
    modalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      this.isLoading = true;
      this.goingBackConfirmed = result as boolean;
      if (this.goingBackConfirmed) {
        this.router.navigate(['/businesses']); //TODO: update to businesses profile route
      } else {
        this.isLoading = false;
      }
    });
  }

  getFormInitialValue(): FormGroup {
    return this.fb.group(createFormControlFields);
  }

  resetForm(): void {
    this.createForm = this.getFormInitialValue();
  }

  setupImgUrlDebounce(): void {
    this.createForm.controls['picture'].valueChanges
      .pipe(debounceTime(700), takeUntil(this.unsubscribeAll$))
      .subscribe((imgUrl: string) => {
        isALoadableImageUrl(imgUrl)
          .then(() => {
            this.currentBusinessImgUrl = imgUrl;
          })
          .catch(() => {
            this.currentBusinessImgUrl = '';
          });
      });
  }
}
