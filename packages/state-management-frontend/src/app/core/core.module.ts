import { NgModule } from '@angular/core';
import { PhoneNumberDirective } from './directives/phone-number.directive';
import { FloatNumberOrNumberRangeDirective } from './directives/float-number-or-number-range.directive';

@NgModule({
  imports: [],
  declarations: [PhoneNumberDirective, FloatNumberOrNumberRangeDirective],
  exports: [PhoneNumberDirective, FloatNumberOrNumberRangeDirective],
})
export class CoreModule {}
