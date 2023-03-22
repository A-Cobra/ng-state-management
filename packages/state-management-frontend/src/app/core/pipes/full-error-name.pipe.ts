import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { fullErrorNameMap } from '../utils/full-error-name.map';
@Pipe({
  name: 'fullErrorName',
})
export class FullErrorNamePipe implements PipeTransform {
  transform(validationErrors: ValidationErrors | null): string {
    if (validationErrors) {
      const errorCode = Object.keys(validationErrors)[0];
      // This returns an array with just one Object, therefore, we access the first one
      return getFullErrorName(errorCode);
    }
    return '';
  }
}
function getFullErrorName(errorCode: string): string {
  return fullErrorNameMap[errorCode] ?? errorCode;
}
