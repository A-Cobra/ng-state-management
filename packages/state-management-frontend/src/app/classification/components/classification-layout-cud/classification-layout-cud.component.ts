import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Classification } from '../../models/api-response.model';

@Component({
  selector: 'state-management-app-classification-layout-cud',
  templateUrl: './classification-layout-cud.component.html',
  styleUrls: ['./classification-layout-cud.component.scss'],
})
export class ClassificationLayoutCUDComponent {
  formCategory: FormGroup;
  currentStatus: string;
  imgDefault =
    'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,f_auto,q_auto:eco,dpr_1/ffbfddoyxp0ccgnu2kdv';
  img = this.imgDefault;
  idClassification: string;
  iconButton: string;

  @Output() dataClassification: EventEmitter<Classification> =
    new EventEmitter();
  @Input() set status(value: string) {
    this.currentStatus = value;
    this.iconButton = this.getIcon();
    this.activateFormByStatus();
  }

  @Input() set classification(value: Classification) {
    if (this.currentStatus !== 'create') {
      this.idClassification = value.id as string;

      this.formCategory.setValue({
        name: value.name,
        numberOfBusinesses: value.numberOfBusinesses,
        description: value.description,
        image: this.imgDefault,
      });
    }
  }

  constructor(private fb: FormBuilder) {
    this.formCategory = this.fb.group({
      name: ['', Validators.required],
      numberOfBusinesses: [0],
      description: ['', Validators.required],
      image: [this.img],
    });
  }

  get numberOfBusinesses() {
    return this.formCategory.controls['numberOfBusinesses'];
  }

  get description(): AbstractControl {
    return this.formCategory.get('description') as AbstractControl;
  }

  get name() {
    return this.formCategory.get('name');
  }

  format(input: string): void {
    this.formCategory.get('name')?.setValue(input.trim());
  }

  getUrl(file: File): void {
    this.formCategory.get('image')?.setValue(file);
  }

  getIcon(): string {
    if (this.currentStatus === 'create') return 'ri-add-line';
    if (this.currentStatus === 'delete') return 'ri-delete-bin-line';
    return 'ri-pencil-line';
  }

  activateFormByStatus(): void {
    if (this.currentStatus === ('detail' || 'delete')) {
      this.formCategory.disable();
    }
    this.numberOfBusinesses.disable();
  }

  submit(): void {
    this.numberOfBusinesses.enable();
    if (this.currentStatus !== 'create') {
      this.dataClassification.emit({
        ...this.formCategory.value,
        id: this.idClassification,
      });
    } else {
      this.dataClassification.emit(this.formCategory.value);
    }

    this.formCategory.reset();
  }
}
