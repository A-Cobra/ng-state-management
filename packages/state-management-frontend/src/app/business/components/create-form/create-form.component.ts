import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { take, Observable, debounceTime } from 'rxjs';
import { ModalService, NotificationService } from '@clapp1/clapp-angular';
import { BusinessService } from '../../services/business.service';
import { FormControlsData } from '../../models/create-form.interface';
import { Classification } from '../../models/classification.interface';
import { BankAccountType } from '../../models/bank-account-type.interface';
import { FORM_CONTROLS_DATA } from '../../utils/form-controls-data';
import { BANK_ACCOUNT_TYPES } from '../../utils/bank-account-types';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { createFormControlsData } from '../../utils/create-form-controls-data';
import { Business } from '../../models/business.interface';
import { isALoadableImageUrl } from '../../../core/utils/is-a-displayable-image-url';

@Component({
  selector: 'app-business-create',
  templateUrl: './create-form.component.html',
  styleUrls: ['./create-form.component.scss'],
})
export class CreateFormComponent implements OnInit {
  constructor(
    private fb: NonNullableFormBuilder,
    private businessService: BusinessService,
    private modalService: ModalService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  createForm = this.fb.group(createFormControlsData);
  classification$!: Observable<Classification[]>;
  formControlsData: FormControlsData = FORM_CONTROLS_DATA;
  bankAccountTypes: BankAccountType[] = BANK_ACCOUNT_TYPES;
  isLoading = false;
  goingBackConfirmed = false;
  currentBusinessImgUrl = '';
  defaultImgUrl = '../../../../assets/template-image.png';

  ngOnInit(): void {
    this.resetForm();
    this.setupImgUrlDebounce();
    this.classification$ = this.businessService.getClassifications();
  }

  onSubmit() {
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

  getFormInitialValue() {
    return this.fb.group(createFormControlsData);
  }

  resetForm() {
    this.createForm = this.getFormInitialValue();
  }

  setupImgUrlDebounce(): void {
    this.createForm.controls['picture'].valueChanges
      .pipe(debounceTime(700))
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
