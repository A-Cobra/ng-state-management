import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpRoutingModule } from './sign-up-routing.module';

@NgModule({
  declarations: [SignUpComponent],
  imports: [
    CommonModule,
    SignUpRoutingModule,
    ClappCardModule,
    ClappTextInputModule,
    ClappButtonModule,
    ReactiveFormsModule,
  ],
})
export class SignUpModule {}
