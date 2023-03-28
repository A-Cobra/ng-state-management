import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { fullErrorNameMap } from '../../core/utils/full-error-name.map';
@Pipe({
  name: 'fullErrorName',
  standalone: true,
})
export class FullErrorNamePipe implements PipeTransform {
  transform(
    validationErrors: ValidationErrors | null,
    minLength?: number,
    maxLength?: number
  ): string {
    if (validationErrors) {
      const errorCode = Object.keys(validationErrors)[0];
      // This returns an array with just one Object, therefore, we access the first one
      // For custom errors that take a parameter
      if (errorCode === 'minlength' && minLength)
        return getFullErrorName(errorCode) + minLength;
      if (errorCode === 'maxlength' && maxLength)
        return getFullErrorName(errorCode) + maxLength;
      return getFullErrorName(errorCode);
    }
    return '';
  }
}
function getFullErrorName(errorCode: string): string {
  return fullErrorNameMap[errorCode] ?? errorCode;
}
