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
import { Observable } from 'rxjs';
import { emailRegex, onlyNumberRegex, onlyTextRegex } from '../../utils/regex';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: UserProfile | undefined;

  isEditing = false;
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

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(
          ({ userId }): Observable<UserProfile | undefined> =>
            this.userService.getUserProfile(userId)
        ),
        tap((userProfile): void => {
          this.userProfile = userProfile;
          this.initForm();
          this.isLoading = false;
        })
      )
      .subscribe();
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
      if (result) {
        this.initForm();
        this.isEditing = false;
      }
    });
  }

  onClickBack(): void {
    const backModalRef = this.backModal();
    backModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (result) {
        this.ngZone.run(() => {
          this.router.navigate(['']);
        });
        this.isEditing = false;
      }
    });
  }

  onClickEdit(): void {
    this.isEditing = true;
    this.profileForm.enable();
  }

  onClickSave(): void {
    const saveChangesModalRef = this.saveChangesModal();
    saveChangesModalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (result) {
        this.isSending = true;
        this.saveChanges();
      }
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
