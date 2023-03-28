import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ClappInputHelpersModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { FullErrorNamePipe } from '../../pipes/full-error-name.pipe';

@Component({
  selector: 'state-management-app-reactive-form-control-text-input',
  templateUrl: './reactive-form-control-text-input.component.html',
  styleUrls: ['./reactive-form-control-text-input.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ClappTextInputModule,
    ClappInputHelpersModule,
    FullErrorNamePipe,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ReactiveFormControlTextInputComponent {
  @Input()
  parentForm: FormGroup;
  @Input()
  controlName = 'displayName';
  @Input()
  displayText: string;
  @Input()
  label: string;
  @Input()
  inputType = 'text';
  @Input()
  required = true;
  @Input()
  staticDisplayText = false;
  @Input()
  maxLength = 1000;
  @Input()
  minLength = 0;
}
