import { UserProfile } from './../../models/user.model';
import { Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { switchMap, take, tap } from 'rxjs/operators';
import { ModalRef, ModalService } from '@clapp1/clapp-angular';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

const onlyTextRegex = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/;
const onlyNumberRegex = /^\d+$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: UserProfile | undefined;

  isEditing = false;
  isDisabled = true;
  isSending = false;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private modalService: ModalService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ userId }) => this.userService.getUserProfile(userId)),
        tap((userProfile) => {
          this.userProfile = userProfile;
          this.initForm();
          this.isLoading = false;
        })
      )
      .subscribe();
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [
        this.userProfile?.name,
        [Validators.required, Validators.pattern(onlyTextRegex)],
      ],
      lastName: [
        this.userProfile?.lastName,
        [Validators.required, Validators.pattern(onlyTextRegex)],
      ],
      phoneNumber: [
        this.userProfile?.phoneNumber,
        [Validators.required, Validators.pattern(onlyNumberRegex)],
      ],
      email: [
        this.userProfile?.email,
        [Validators.required, Validators.email, Validators.pattern(emailRegex)],
      ],
    });

    this.profileForm.disable();
  }

  onClickCancel() {
    const cancelModalRef = this.cancelModal();
    cancelModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (result) {
        this.initForm();
        this.isEditing = false;
      }
    });
  }

  onClickBack() {
    const backModalRef = this.backModal();
    backModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (result)
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
    });
    this.isEditing = false;
  }

  onClickEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  onClickSave() {
    const saveChangesModalRef = this.saveChangesModal();
    saveChangesModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (result) {
        this.isSending = true;
        this.saveChanges();
      }
    });
  }

  saveChanges() {
    this.userService
      .saveUserProfile({ ...this.profileForm.value, id: this.userProfile?.id })
      .subscribe({
        next: (userProfile) => {
          this.userProfile = userProfile;
        },
        complete: () => {
          this.initForm();
          this.isSending = false;
          this.isEditing = false;
        },
      });
  }

  saveChangesModal(): ModalRef {
    return this.modalService.open(ConfirmationModalComponent, {
      data: {
        title: 'Are you sure to save the changes?',
        message: 'The changes made can be changed later',
        confirmButtonLabel: 'Save',
        cancelButtonLabel: 'Cancel',
      },
      width: 'fit-content',
      height: 'fit-content',
    });
  }

  backModal(): ModalRef {
    return this.modalService.open(ConfirmationModalComponent, {
      data: {
        title: 'Are you sure leave?',
        message: 'Changes will not be saved',
        confirmButtonLabel: 'Leave',
        cancelButtonLabel: 'Cancel',
      },
      width: 'fit-content',
      height: 'fit-content',
    });
  }

  cancelModal(): ModalRef {
    return this.modalService.open(ConfirmationModalComponent, {
      data: {
        title: 'Are you sure to cancel?',
        message: 'Changes will not be saved',
        confirmButtonLabel: 'Cancel',
        cancelButtonLabel: 'Edit',
      },
      width: 'fit-content',
      height: 'fit-content',
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.profileForm.get(controlName) as AbstractControl;
  }
}
