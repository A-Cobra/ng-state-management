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

  isEditing = false;
  isDisabled = true;
  isSending = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(({ userId }) => {
      this.userService.getUserProfile(userId).subscribe((userProfile) => {
        this.initForm(userProfile);
      });
    });
  }

  initForm(userProfile: UserProfile | undefined) {
    this.profileForm = this.fb.group({
      name: [
        userProfile?.name,
        [Validators.required, Validators.pattern(onlyTextRegex)],
      ],
      lastName: [
        userProfile?.lastName,
        [Validators.required, Validators.pattern(onlyTextRegex)],
      ],
      phoneNumber: [
        userProfile?.phoneNumber,
        [Validators.required, Validators.pattern(onlyNumberRegex)],
      ],
      email: [
        userProfile?.email,
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
    this.isEditing = false;
    this.profileForm.disable();
  }

  getControl(controlName: string): AbstractControl {
    return this.profileForm.get(controlName) as AbstractControl;
  }
}
