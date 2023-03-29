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
        image: this.imgDefault,
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

  get numberOfBusinesses() {
    return this.classificationForm.controls['numberOfBusinesses'];
  }

  get description(): AbstractControl {
    return this.classificationForm.get('description') as AbstractControl;
  }

  get name(): AbstractControl {
    return this.classificationForm.get('name') as AbstractControl;
  }

  get image(): AbstractControl {
    return this.classificationForm.get('image') as AbstractControl;
  }

  changeFormatInput(input: string): void {
    this.classificationForm.get('name')?.setValue(input.trim());
  }

  addToFormControl(file: File): void {
    this.classificationForm.get('image')?.setValue(file);
  }

  getIcon(): string {
    if (this.currentStatus === 'create') return 'ri-add-line';
    if (this.currentStatus === 'detail') return 'ri-delete-bin-line';
    return 'ri-pencil-line';
  }

  activateFormByStatus(): void {
    this.numberOfBusinesses.disable();
    if (this.currentStatus === 'detail') {
      this.classificationForm.disable();
    }
  }

  getNavigate(): string[] {
    if (this.currentStatus === 'edit') {
      return ['../../detail', this.idClassification];
    }
    if (this.currentStatus === 'detail') {
      return ['../../'];
    } else {
      return ['../'];
    }
  }

  submit(): void {
    this.numberOfBusinesses.enable();

    if (this.currentStatus !== 'create') {
      this.dataClassification.emit({
        ...this.classificationForm.value,
        id: this.idClassification,
      });
    } else {
      // set value image type string until to know input and output type of API
      this.image.setValue(JSON.stringify(this.image.value));
      this.numberOfBusinesses.setValue(0);
      this.dataClassification.emit(this.classificationForm.value);
      this.classificationForm.reset();
      this.image.setValue('');
    }
  }
}
