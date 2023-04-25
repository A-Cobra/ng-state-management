import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[stateManagementAppTrimText]',
  standalone: true,
})
export class TrimTextDirective {
  @Input()
  reactiveFormControl!: AbstractControl;

  @HostListener('change', ['$event'])
  onChange(event: InputEvent) {
    const inputTarget = event.target as HTMLInputElement;
    const inputValue = inputTarget.value;
    this.reactiveFormControl.setValue(this.trimText(inputValue));
  }

  trimText(value: string): string {
    return value.trim();
  }
}
