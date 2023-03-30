import { UserProfile } from './../../models/user.model';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { switchMap, tap } from 'rxjs/operators';

const onlyTextRegex = /^[a-zA-Z][a-zA-Z\s]*[a-zA-Z]$/;
const onlyNumberRegex = /^\d+$/;
const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
@Component({
  selector: 'state-management-app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  userProfile: UserProfile | undefined;

  isEditing = false;
  isDisabled = true;
  isSending = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        switchMap(({ userId }) => this.userService.getUserProfile(userId)),
        tap((userProfile) => {
          this.userProfile = userProfile;
          this.initForm();
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

  onClickEdit() {
    this.isEditing = true;
    this.profileForm.enable();
  }

  onClickSave() {
    this.isSending = true;
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

  getControl(controlName: string): AbstractControl {
    return this.profileForm.get(controlName) as AbstractControl;
  }
}
