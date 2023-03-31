import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Classification } from '../../models/api-response.model';

@Component({
  selector: 'state-management-app-classification-layout-form',
  templateUrl: './classification-layout-form.component.html',
  styleUrls: ['./classification-layout-form.component.scss'],
})
export class ClassificationLayoutFormComponent {
  classificationForm: FormGroup;
  currentStatus: string;
  imgDefault = 'assets/img/placeholder-image.png';
  idClassification: string;
  iconButton: string;

  @Input() set status(value: string) {
    this.currentStatus = value;
    this.iconButton = this.getIcon();
    this.activateFormByStatus();
  }

  @Input() set classification(value: Classification) {
    if (this.currentStatus !== 'create') {
      const id = value.id;
      if (id) {
        this.idClassification = id;
      }
      this.classificationForm.setValue({
        name: value.name,
        numberOfBusinesses: value.numberOfBusinesses,
        description: value.description,
        image: this.imgDefault, //TODO change url from BE instead image default
      });
    }
  }

  @Output() dataClassification: EventEmitter<Classification> =
    new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.classificationForm = this.fb.group({
      name: ['', Validators.required],
      numberOfBusinesses: [0],
      description: ['', Validators.required],
      image: [''],
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.classificationForm.get(controlName) as AbstractControl;
  }

  changeFormatInput(input: string): void {
    this.getControl('name').setValue(input.trim());
  }

  addToFormControl(file: File): void {
    this.getControl('image').setValue(file);
  }

  getIcon(): string {
    switch (this.currentStatus) {
      case 'edit':
        return 'ri-pencil-line';
      case 'delete':
        return 'ri-delete-bin-line';
      default:
        return 'ri-add-line';
    }
  }

  activateFormByStatus(): void {
    this.getControl('numberOfBusinesses').disable();
    if (this.currentStatus === 'delete') {
      this.classificationForm.disable();
    }
  }

  getNavigate(): string[] {
    switch (this.currentStatus) {
      case 'edit':
        return ['../../detail', this.idClassification];
      case 'delete':
        return ['../../'];
      default:
        return ['../'];
    }
  }

  setValueOnInputsWithoutFormControl(): void {
    // set value image type string until to know input and output type of API
    this.getControl('image').setValue(
      JSON.stringify(this.getControl('image').value)
    );
    this.getControl('numberOfBusinesses').setValue(0);
  }

  submit(): void {
    this.getControl('numberOfBusinesses').enable();

    if (this.currentStatus !== 'create') {
      this.dataClassification.emit({
        ...this.classificationForm.value,
        id: this.idClassification,
      });
    } else {
      this.setValueOnInputsWithoutFormControl();
      this.dataClassification.emit(this.classificationForm.value);
      this.classificationForm.reset();
      this.getControl('image').setValue('');
    }
  }
}
