import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
export function notSpaces(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  return new Observable((observer: Observer<ValidationErrors | null>) => {
    if (control.value && control.value.match(/(\s{2,})/g)) {
      observer.next({ noSpaces: true });
    } else {
      observer.next(null);
    }
    observer.complete();
  });
}
