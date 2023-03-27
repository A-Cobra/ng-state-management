import { NgModule } from '@angular/core';
import { FloatNumberDirective } from './directives/float-number.directive';
import { PhoneNumberDirective } from './directives/phone-number.directive';

@NgModule({
  imports: [],
  declarations: [PhoneNumberDirective, FloatNumberDirective],
  exports: [PhoneNumberDirective, FloatNumberDirective],
})
export class CoreModule {}
