import { Directive, HostListener, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Directive({
  selector: '[stateManagementAppFloatNumberOrNumberRange]',
  standalone: true,
})
export class FloatNumberOrNumberRangeDirective {
  @Input()
  maxValue!: number;
  @Input()
  minValue!: number;
  @Input()
  reactiveFormControl!: AbstractControl;
  spaceRegex = /\s+/g;
  nonNumericalRegex = /[^0-9]+/g;
  allowedOperatorsRegex = /[+-]/g;
  dotRegex = /\./g;
  undesiredCharactersRegex = /[^0-9.+-]/g;

  @HostListener('input', ['$event'])
  onInput(event: KeyboardEvent) {
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
    const plusPosition = inputValue.lastIndexOf('+');
    const minusPosition = inputValue.lastIndexOf('-');
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
    let formattedString = inputValue;
    const currentInputNumber = parseFloat(inputValue);
    if (!this.minValue && !this.maxValue) return inputValue;
    else if (this.minValue && !this.maxValue) {
      if (currentInputNumber < this.minValue) {
        formattedString = `${this.minValue}`;
      }
    } else if (!this.minValue && this.maxValue) {
      if (currentInputNumber > this.maxValue) {
        formattedString = `${this.maxValue}`;
      }
    } else {
      if (currentInputNumber <= this.minValue) {
        formattedString = `${this.minValue}`;
      } else if (currentInputNumber >= this.maxValue) {
        formattedString = `${this.maxValue}`;
      }
    }
    return formattedString;
  }
}
