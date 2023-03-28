import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, Observer } from 'rxjs';

export function passwordMatch(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  return new Observable((observer: Observer<ValidationErrors | null>) => {
    const passwordControl = control.parent?.get('password');
    const confirmPasswordControl = control.parent?.get('confirmPassword');
    if (passwordControl?.value !== confirmPasswordControl?.value) {
      observer.next({ passwordMismatch: true });
    } else {
      observer.next(null);
    }
    observer.complete();
  });
}
