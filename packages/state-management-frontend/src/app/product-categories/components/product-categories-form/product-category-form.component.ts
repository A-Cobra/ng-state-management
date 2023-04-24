import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';

import { NotificationService } from '@clapp1/clapp-angular';

import { FormSubmitEvent } from '../../models/form-submit-event.model';
import { ProductCategoryInterface } from '@state-management-app/types';

@Component({
  selector: 'app-product-category-form',
  templateUrl: './product-category-form.component.html',
  styleUrls: ['./product-category-form.component.scss'],
})
export class ProductCategoryFormComponent implements OnChanges {
  @Input() productCategory: ProductCategoryInterface | null;
  @Input() productCategoryError: Error | null;
  @Input() productCategorySubmitError: Error | null;
  @Input() isCreate: boolean;
  @Output() formSubmit = new EventEmitter<FormSubmitEvent>();
  readonly #fb = inject(NonNullableFormBuilder);
  readonly #notificationService = inject(NotificationService);
  form = this.#fb.group({
    name: ['', Validators.required],
    description: [''],
  });
  productCategoryId: string;
  submitButtonIcons = {
    create: 'ri-add-fill',
    edit: 'ri-edit-fill',
    save: 'ri-save-fill',
  };

  get name(): AbstractControl {
    return this.form.get('name') as AbstractControl;
  }

  ngOnChanges(simpleChanges: SimpleChanges): void {
    const { productCategory, productCategorySubmitError } = simpleChanges;
    if (productCategory && productCategory.currentValue) {
      this.form.reset(productCategory.currentValue);
      this.form.disable();
      this.productCategoryId = productCategory.currentValue.id;
    }

    if (productCategorySubmitError) {
      if (productCategorySubmitError.currentValue) {
        this.#notificationService.error(
          productCategorySubmitError.currentValue.message,
          'Error',
          {
            position: 'bottom-right',
            duration: 5000,
          }
        );
      }
    }
  }

  onFormSubmit(): void {
    if (this.form.invalid) return;

    this.formSubmit.emit({
      id: this.productCategoryId,
      productCategory: this.form.getRawValue(),
    });
  }
}
