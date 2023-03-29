import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {
  ClappInputHelpersModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class UserModule {}
