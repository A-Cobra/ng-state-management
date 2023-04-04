import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[stateManagementAppOnlyNumber]',
  standalone: true,
})
export class OnlyNumberDirective {
  @Input()
  reactiveFormControl!: AbstractControl;
  nonNumericalRegex = /[^0-9]+/g;

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
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
