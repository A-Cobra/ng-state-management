import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ClappButtonModule,
  ClappInputHelpersModule,
  ClappTextInputModule,
  ModalService,
} from '@clapp1/clapp-angular';

import { LoaderComponent } from '../shared/components/loader/loader.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';

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
    ...clappModules,
    ...standaloneComponents,
  ],
  providers: [UserService, ModalService],
})
export class UserModule {}
