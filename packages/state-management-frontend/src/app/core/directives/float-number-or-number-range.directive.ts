import { AfterViewInit, Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[stateManagementAppFloatNumberOrNumberRange]',
})
export class FloatNumberOrNumberRangeDirective implements AfterViewInit {
  @Input()
  range!: number;
  @Input()
  reactiveFormControl!: AbstractControl;
  spaceRegex = /\s+/g;
  nonNumericalRegex = /[^0-9]+/g;
  allowedOperatorsRegex = /[+-]/g;
  dotRegex = /\./g;
  undesiredCharactersRegex = /[^0-9.+-]/g;

  ngAfterViewInit(): void {
    this.range = Math.abs(this.range) ?? null;
  }
  @HostListener('input', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const inputTarget = event.target as HTMLInputElement;
    let inputValue = inputTarget.value;
    inputValue = this.onlyInitialOperator(inputValue);
    inputValue = this.onlyOneDot(inputValue);
    inputValue = this.removeUndesiredCharacters(inputValue);
    inputValue = this.verifyRange(inputValue);
    this.reactiveFormControl.setValue(inputValue);
  }

  onlyInitialOperator(inputValue: string): string {
    let formattedString = inputValue;
    const plusPosition = inputValue.lastIndexOf('+'); //Only 0 and -1 accepted
    const minusPosition = inputValue.lastIndexOf('-'); //Only 0 and -1 accepted
    if (plusPosition > 0 || minusPosition > 0) {
      formattedString =
        formattedString[0] +
        formattedString.slice(1).replace(this.allowedOperatorsRegex, '');
    }
    return formattedString;
  }

  onlyOneDot(inputValue: string): string {
    let formattedString = inputValue;
    if (formattedString.split('.').length - 1 > 1) {
      const firstDotIndex = formattedString.indexOf('.');
      formattedString =
        formattedString.slice(0, firstDotIndex + 1) +
        formattedString.slice(firstDotIndex + 1).replace(this.dotRegex, '');
    }
    return formattedString;
  }

  removeUndesiredCharacters(inputValue: string): string {
    return inputValue.replace(this.undesiredCharactersRegex, '');
  }

  verifyRange(inputValue: string): string {
    if (!this.range) return inputValue;
    let formattedString = inputValue;
    const currentInputNumber = parseFloat(inputValue);
    if (currentInputNumber >= 0 && currentInputNumber >= this.range) {
      formattedString = `${this.range}`;
    } else if (currentInputNumber < 0 && currentInputNumber <= -this.range) {
      formattedString = `-${this.range}`;
    }
    return formattedString;
  }
}
