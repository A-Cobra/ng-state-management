import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export function notEmpty(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  return new Observable((observer: Observer<ValidationErrors | null>) => {
    if (control.value && control.value.trim().length === 0) {
      observer.next({ noSpaces: true });
    } else {
      observer.next(null);
    }
    observer.complete();
  });
}
