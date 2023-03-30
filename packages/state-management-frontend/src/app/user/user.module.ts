import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import {
  ClappButtonModule,
  ClappInputHelpersModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    ClappButtonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
})
export class UserModule {}
