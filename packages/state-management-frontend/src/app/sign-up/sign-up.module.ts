import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import {
  ClappButtonModule,
  ClappCardModule,
  ClappInputHelpersModule,
  ClappNotificationModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { LoaderComponent } from '../components/loader/loader.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpService } from './services/sign-up.service';
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
    ClappInputHelpersModule,
    LoaderComponent,
    ClappNotificationModule,
  ],
  providers: [SignUpService],
})
export class SignUpModule {}
