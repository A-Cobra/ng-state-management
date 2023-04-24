import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize, take } from 'rxjs/operators';
import { UserProfile } from './../../models/user.model';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { UserService } from '../../services/user.service';
import { emailRegex, onlyNumberRegex, onlyTextRegex } from '../../utils/regex';
import {
  ModalRef,
  ModalService,
  NotificationService,
} from '@clapp1/clapp-angular';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

import {
  backModalConfig,
  cancelModalConfig,
  saveChangesModalConfig,
} from '../../utils/modal-config';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;

  userProfile?: UserProfile;

  isEditing = false;
  isSending = false;
  isLoading = true;
  hasUser = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserProfile()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe({
        next: (userProfile: UserProfile | undefined) => {
          this.userProfile = userProfile;
          this.initForm();
        },
        error: () => {
          this.hasUser = false;
        },
      });
  }

  initForm(): void {
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

  onClickCancel(): void {
    const cancelModalRef = this.getCancelModal();
    cancelModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;
      this.initForm();
      this.isEditing = false;
    });
  }

  onClickBack(): void {
    const backModalRef = this.getBackModal();
    backModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;

      this.isEditing = false;
      this.router.navigate(['']);
    });
  }

  onClickEdit(): void {
    this.isEditing = true;
    this.profileForm.enable();
  }

  onClickSave(): void {
    const saveChangesModalRef = this.saveChangesModal();
    saveChangesModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;

      this.isSending = true;
      this.saveChanges();
    });
  }

  saveChanges(): void {
    const userInfo: UserProfile = {
      name: this.getControl('name').value.trim(),
      lastName: this.getControl('lastName').value.trim(),
      phoneNumber: this.getControl('phoneNumber').value.trim(),
      email: this.getControl('email').value.trim(),
    };

    this.userService
      .saveUserProfile({
        ...userInfo,
        id: this.userProfile?.id,
      })
      .pipe(
        finalize(() => {
          this.initForm();
          this.isSending = false;
          this.isEditing = false;
        })
      )
      .subscribe({
        next: (userProfile) => {
          this.userProfile = userProfile;
        },
        complete: () => {
          this.showNotificationSuccess();
        },
        error: (error) => {
          this.showNotificationError(error);
        },
      });
  }

  saveChangesModal(): ModalRef {
    return this.modalService.open(
      ConfirmationModalComponent,
      saveChangesModalConfig
    );
  }

  getBackModal(): ModalRef {
    return this.modalService.open(ConfirmationModalComponent, backModalConfig);
  }

  getCancelModal(): ModalRef {
    return this.modalService.open(
      ConfirmationModalComponent,
      cancelModalConfig
    );
  }

  showNotificationSuccess(): void {
    this.notificationService.success(
      'User profile updated successfully',
      'Success!'
    );
  }

  showNotificationError(
    error = 'An error has occurred while updating the user profile'
  ): void {
    this.notificationService.error(error, 'Unexpected error!');
  }

  getControl(controlName: string): AbstractControl {
    return this.profileForm.get(controlName) as AbstractControl;
  }
}
