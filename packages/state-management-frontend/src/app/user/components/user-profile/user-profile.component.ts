import { Component, NgZone, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ModalRef, ModalService } from '@clapp1/clapp-angular';
import { finalize, take } from 'rxjs/operators';

import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';
import { UserService } from '../../services/user.service';
import {
  backModalConfig,
  cancelModalConfig,
  saveChangesModalConfig,
} from '../../utils/modal-config';
import { emailRegex, onlyNumberRegex, onlyTextRegex } from '../../utils/regex';
import { UserProfile } from './../../models/user.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;

  userProfile$: Observable<UserProfile | undefined>;
  userProfile: UserProfile | undefined;

  isEditing = false;
  isSending = false;
  isLoading = true;
  hasUser = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private modalService: ModalService,
    private router: Router,
    private ngZone: NgZone
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
    const cancelModalRef = this.cancelModal();
    cancelModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;
      this.initForm();
      this.isEditing = false;
    });
  }

  onClickBack(): void {
    const backModalRef = this.backModal();
    backModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (!result) return;

      this.isEditing = false;
      this.ngZone.run(() => {
        this.router.navigate(['']);
      });
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
    return this.modalService.open(
      ConfirmationModalComponent,
      saveChangesModalConfig
    );
  }

  backModal(): ModalRef {
    return this.modalService.open(ConfirmationModalComponent, backModalConfig);
  }

  cancelModal(): ModalRef {
    return this.modalService.open(
      ConfirmationModalComponent,
      cancelModalConfig
    );
  }

  getControl(controlName: string): AbstractControl {
    return this.profileForm.get(controlName) as AbstractControl;
  }
}
