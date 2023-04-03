import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export function validPassword(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  return new Observable((observer: Observer<ValidationErrors | null>) => {
    const password = control.parent?.get('password')?.value;
    if (
      !password.match(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
      )
    ) {
      observer.next({ invalidPassword: true });
    } else {
      observer.next(null);
    }
    observer.complete();
  });
}
