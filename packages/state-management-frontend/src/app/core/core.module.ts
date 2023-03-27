import { NgModule } from '@angular/core';
import { PhoneNumberDirective } from './directives/phone-number.directive';

@NgModule({
  imports: [],
  declarations: [PhoneNumberDirective],
  exports: [PhoneNumberDirective],
})
export class CoreModule {}
