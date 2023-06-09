import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserService } from './services/user.service';
import { UserRoutingModule } from './user-routing.module';
import { LoaderComponent } from '../shared/components/loader/loader.component';
import { TrimTextDirective } from '../shared/directives/trim-text.directive';
import {
  ClappButtonModule,
  ClappInputHelpersModule,
  ClappTextInputModule,
  ModalService,
} from '@clapp1/clapp-angular';

const clappModules = [
  ClappTextInputModule,
  ClappInputHelpersModule,
  ClappButtonModule,
];
const standaloneComponents = [LoaderComponent];
const standaloneDirectives = [TrimTextDirective];

@NgModule({
  declarations: [UserProfileComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    ...clappModules,
    ...standaloneComponents,
    ...standaloneDirectives,
  ],
  providers: [UserService, ModalService],
})
export class UserModule {}
