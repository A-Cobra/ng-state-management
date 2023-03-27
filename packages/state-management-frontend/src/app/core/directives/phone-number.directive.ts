import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[stateManagementAppPhoneNumber]',
})
export class PhoneNumberDirective implements AfterViewInit {
  @Input()
  formControl!: AbstractControl;
  spaceRegex = /\s+/g;
  nonNumericalRegex = /[^0-9]+/g;

  constructor(private baseElement: ElementRef) {}
  ngAfterViewInit(): void {
    const baseElement = this.baseElement.nativeElement;
    console.log('element');
    console.log(baseElement);
    console.log("element.getElementsByClassName('form__group')");
    console.log("element.getElementsByTagName('input')");
    const inputElement = baseElement.getElementsByTagName('input')[0];

    console.log('inputElements');
    console.log(inputElement);
    inputElement.value = '123456789';
  }

  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    console.log('input from host listener');
    console.log(input);
    console.log('this.originalFormControl');
    console.log(this.formControl);
    this.formControl.setValue('ANY VALUE');
    // input.value = this.nonInitialZero(input.value);
    // input.value = this.removeNonNumericalCharacters(input.value);
    // input.value = this.formatNumber(input.value);
    // this.originalFormControl.patchValue({
    //   phone: input.value,
    // });
  }
}
