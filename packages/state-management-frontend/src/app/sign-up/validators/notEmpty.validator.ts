import { AbstractControl, ValidationErrors } from '@angular/forms';

export function notEmpty(control: AbstractControl): ValidationErrors | null {
  if (control.value && control.value.trim().length === 0) {
    return { noSpaces: true };
  }
  return null;
}
