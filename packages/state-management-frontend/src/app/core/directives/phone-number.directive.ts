import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[stateManagementAppPhoneNumber]',
})
export class PhoneNumberDirective {
  @Input()
  reactiveFormControl!: AbstractControl;
  spaceRegex = /\s+/g;
  nonNumericalRegex = /[^0-9]+/g;

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const inputTarget = event.target as HTMLInputElement;
    const inputValue = inputTarget.value;
    this.reactiveFormControl.setValue(
      this.removeNonNumericalCharacters(inputValue)
    );
  }

  removeNonNumericalCharacters(originalString: string): string {
    return originalString.replace(this.nonNumericalRegex, '');
  }
}
