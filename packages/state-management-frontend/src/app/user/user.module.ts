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
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { UserService } from './services/user.service';

const clappModules = [
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappButtonModule,
];

const standaloneComponents = [LoaderComponent];
@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ...clappModules,
    ...standaloneComponents,
  ],
  providers: [UserService],
})
export class UserModule {}
