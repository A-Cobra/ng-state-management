import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessRoutingModule } from './business-routing.module';
import { BusinessEditComponent } from './components/business-edit/business-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ClappTextInputModule } from '@clapp1/clapp-angular';
import { ClappInputHelpersModule } from '@clapp1/clapp-angular';
import { BusinessEditDisplayNameInputComponent } from './components/business-edit-display-name-input/business-edit-display-name-input.component';
import { FullErrorNamePipe } from '../core/pipes/full-error-name.pipe';

@NgModule({
  declarations: [
    BusinessEditComponent,
    BusinessEditDisplayNameInputComponent,
    FullErrorNamePipe,
  ],
  imports: [
    CommonModule,
    BusinessRoutingModule,
    ReactiveFormsModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BusinessModule {}
