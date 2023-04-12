import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Classification } from '../../models/api-response.model';
import { notSpaces } from '../../validators/not-spaces.validators';

@Component({
  selector: 'app-classification-layout-form',
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
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
        [notSpaces],
      ],
      numberOfBusinesses: [0],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(300),
        ],
      ],
      image: [''],
    });
  }

  getControl(controlName: string): AbstractControl {
    return this.classificationForm.get(controlName) as AbstractControl;
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
    //TODO set value image by default until to know input type of API
    this.getControl('image').setValue(this.imgDefault);
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
