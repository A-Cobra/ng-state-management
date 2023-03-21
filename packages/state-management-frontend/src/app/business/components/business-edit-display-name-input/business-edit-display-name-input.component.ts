import { Component, Input } from '@angular/core';
import { FormGroup, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'state-management-app-business-edit-display-name-input',
  templateUrl: './business-edit-display-name-input.component.html',
  styleUrls: ['./business-edit-display-name-input.component.scss'],
})
export class BusinessEditDisplayNameInputComponent {
  @Input()
  parentForm: FormGroup;
  @Input()
  hasError: (controlName: string, errorName: string) => boolean;
  @Input()
  controlName = 'displayName';
  @Input()
  displayText: string;
  @Input()
  label: string;
  gettypeof(variable: { [key: string]: string }) {
    return typeof variable;
  }

  getErrorsAsArray(getErrorsAsArray: ValidationErrors | null): string {
    if (getErrorsAsArray) {
      const validationKeys = Object.keys(getErrorsAsArray);
      return validationKeys[0];
    }
    return '';
  }
}
