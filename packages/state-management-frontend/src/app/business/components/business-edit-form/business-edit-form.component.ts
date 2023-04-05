import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { ModalService } from '@clapp1/clapp-angular';
import { FormEditPayload } from '../../models/form-edit-payload.interface';
import { InvalidFormModalComponent } from '../../../shared/components/invalid-form-modal/invalid-form-modal.component';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { Router } from '@angular/router';
import { Subject, debounceTime, take, takeUntil } from 'rxjs';
import { deleteBusinessModalConfig } from '../../utils/delete-business-modal-config';
import { goToBusinessesListModalConfig } from '../../utils/go-to-business-list-modal-config';
import { isALoadableImageUrl } from '../../../core/utils/is-a-displayable-image-url';
import { editFormControlFields } from '../../utils/edit-form-control-fields';

@Component({
  selector: 'app-business-edit-form',
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
  @Input()
  activeRequest = false;
  @Output()
  formSubmit = new EventEmitter<FormEditPayload>();
  @Output()
  businessDeletion = new EventEmitter<FormEditPayload>();
  mockClassificationList: {
    key: string;
    disabled: boolean;
  }[] = [];
  editing = false;
  currentBusinessImgUrl = '';
  defaultImgUrl = 'assets/template-image.png';
  unsubscribeAll$ = new Subject<string>();
  businessFormEdit = this.formBuilder.group(editFormControlFields);

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
    this.unsubscribeAll$.next('');
    this.unsubscribeAll$.unsubscribe();
  }

  setupImgUrlDebounce(): void {
    this.businessFormEdit.controls['imgUrl'].valueChanges
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

  onEditClick(): void {
    this.toggleEditingStatus();
    this.enableFormControls();
  }

  onSaveClick(): void {
    if (this.businessFormEdit.invalid) {
      this.modalService.open(InvalidFormModalComponent, {
        width: 'fit-content',
        height: 'fit-content',
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

  onSearchValueDeleted(): void {
    this.mockClassificationList = [...this.classificationsBackendData];
  }

  onGoToBusinessesList(): void {
    const modalRef = this.modalService.open(
      ConfirmationModalComponent,
      goToBusinessesListModalConfig
    );
    modalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      const confirmation = result as boolean;
      if (confirmation) {
        this.router.navigate(['businesses']);
      }
    });
  }

  onDeleteBusiness(): void {
    const modalRef = this.modalService.open(
      ConfirmationModalComponent,
      deleteBusinessModalConfig(this.businessData.businessName)
    );
    modalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      const confirmation = result as boolean;
      if (confirmation) {
        this.businessDeletion.emit();
      }
    });
  }

  toggleEditingStatus(): void {
    this.editing = !this.editing;
  }

  disableFormControls(): void {
    this.businessFormEdit.disable();
  }

  enableFormControls(): void {
    this.businessFormEdit.enable();
  }

  fillFormControls(): void {
    this.businessFormEdit.patchValue(this.businessData);
  }

  displayClassificationMatches(pattern: string) {
    this.mockClassificationList = this.classificationsBackendData.filter(
      (classification) => classification.key.toLowerCase().match(pattern)
    );
  }
}
