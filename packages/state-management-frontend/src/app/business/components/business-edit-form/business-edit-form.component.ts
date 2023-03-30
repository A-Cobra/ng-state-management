import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ModalService } from '@clapp1/clapp-angular';
import { CustomFormValidations } from '../../../core/utils/custom-form-validations';
import { FormEditPayload } from '../../models/form-edit-payload.interface';
import { InvalidFormModalComponent } from '../../../shared/components/invalid-form-modal/invalid-form-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { deleteBusinessModalConfig } from '../../utils/delete-business-modal-config';
import { goToBusinessesListModalConfig } from '../../utils/go-to-business-list-modal-config';
import { isALoadableImageUrl } from '../../../core/utils/is-a-displayable-image-url';

@Component({
  selector: 'state-management-app-business-edit-form',
  templateUrl: './business-edit-form.component.html',
  styleUrls: ['./business-edit-form.component.scss'],
})
export class BusinessEditFormComponent implements OnInit, OnDestroy {
  @Input()
  id: number;
  @Input()
  businessData: {
    displayName: string;
    businessName: string;
    businessClassification: string;
    contactPhoneNumber: string;
    contactEmail: string;
    contactAddress: string;
    longitude: string;
    latitude: string;
    imgUrl: string;
    totalBranches: number;
  };
  @Input()
  classificationsBackendData: {
    key: string;
    disabled: boolean;
  }[] = [];
  @Output()
  formSubmit = new EventEmitter<FormEditPayload>();
  @Output()
  // CHANGE THE EVENT EMITTER TYPE
  businessDeletion = new EventEmitter<FormEditPayload>();
  mockClassificationList: {
    key: string;
    disabled: boolean;
  }[] = [];
  editing = false;
  // @Input()
  // ongoingRequest = false;
  @Input()
  activeRequest = false;
  currentBusinessImgUrl = '';
  defaultImgUrl = '../../../../assets/template-image.png';
  terminateAllSubscriptions$ = new Subject<string>();
  businessFormEdit = this.formBuilder.group({
    displayName: ['', [Validators.required, CustomFormValidations.namePattern]],
    businessName: [
      '',
      [Validators.required, CustomFormValidations.namePattern],
    ],
    businessClassification: ['', [Validators.required]],
    contactPhoneNumber: [
      '',
      [Validators.required, CustomFormValidations.phoneNumber],
    ],
    contactEmail: [
      'name@domain.suffix',
      [Validators.required, CustomFormValidations.email],
    ],
    contactAddress: ['Address', [Validators.required]],
    longitude: [
      'Longitude',
      [Validators.required, CustomFormValidations.floatNumber],
    ],
    latitude: [
      'Latitude',
      [Validators.required, CustomFormValidations.floatNumber],
    ],
    imgUrl: [''],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private readonly modalService: ModalService,
    private router: Router
  ) {
    this.disableFormControls();
  }
  ngOnInit(): void {
    this.fillFormControls();
    this.setupImgUrlDebounce();
    this.onSearchValueDeleted();
  }
  ngOnDestroy(): void {
    this.terminateAllSubscriptions$.next('');
    this.terminateAllSubscriptions$.unsubscribe();
  }

  setupImgUrlDebounce(): void {
    this.businessFormEdit.controls['imgUrl'].valueChanges
      .pipe(debounceTime(700))
      .subscribe((imgUrl: string) => {
        isALoadableImageUrl(imgUrl)
          ? (this.currentBusinessImgUrl = imgUrl)
          : (this.currentBusinessImgUrl = '');
      });
  }

  onEditClick(): void {
    this.toggleEditingStatus();
    this.enableFormControls();
  }

  onSaveClick(): void {
    if (this.businessFormEdit.invalid) {
      this.modalService.open(InvalidFormModalComponent, {
        width: '420px',
        height: '250px',
      });
      return;
    }
    this.activeRequest = true;
    this.toggleEditingStatus();
    this.disableFormControls();
    const { businessName, contactEmail } = this.businessFormEdit.value;
    const payload: FormEditPayload = {
      businessName: businessName ?? '',
      contactEmail: contactEmail ?? '',
    };
    this.formSubmit.emit(payload);
  }

  onSearchKeyUp(keyUp: KeyboardEvent): void {
    const inputValue = (keyUp.target as HTMLInputElement).value;
    this.displayClassificationMatches(inputValue.toLowerCase());
  }

  onSearchValueDeleted() {
    this.mockClassificationList = [...this.classificationsBackendData];
  }

  onGoToBusinessesList(): void {
    const modalRef = this.modalService.open(
      ConfirmationModalComponent,
      goToBusinessesListModalConfig
    );
    modalRef.afterClosed
      .pipe(takeUntil(this.terminateAllSubscriptions$))
      .subscribe((result) => {
        const confirmation = result as boolean;
        if (confirmation) {
          this.router.navigate(['businesses']);
        }
      });
  }

  onDeleteBusiness() {
    const modalRef = this.modalService.open(
      ConfirmationModalComponent,
      deleteBusinessModalConfig(this.businessData.businessName)
    );
    modalRef.afterClosed
      .pipe(takeUntil(this.terminateAllSubscriptions$))
      .subscribe((result) => {
        // this.loader = true;
        const confirmation = result as boolean;
        if (confirmation) {
          this.businessDeletion.emit();
          console.log('Business being deleted');
          // this.businessService.deleteBusiness(this.id);
        }
      });
  }

  toggleEditingStatus(): void {
    this.editing = !this.editing;
  }

  disableFormControls(): void {
    Object.keys(this.businessFormEdit.controls).forEach((key) => {
      this.businessFormEdit.get(key)?.disable();
    });
  }

  enableFormControls(): void {
    Object.keys(this.businessFormEdit.controls).forEach((key) => {
      this.businessFormEdit.get(key)?.enable();
    });
  }

  fillFormControls(): void {
    Object.keys(this.businessFormEdit.controls).forEach((key) => {
      this.businessFormEdit
        .get(key)
        ?.setValue(
          `${this.businessData[key as keyof typeof this.businessData]}`
        );
    });
  }

  displayClassificationMatches(pattern: string) {
    this.mockClassificationList = this.classificationsBackendData.filter(
      (classification) => classification.key.toLowerCase().match(pattern)
    );
  }
}
