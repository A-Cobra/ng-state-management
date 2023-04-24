import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ProductCategoryInterface } from '@state-management-app/types';
import { FormSubmitEvent } from '../../../product-categories/models/form-submit-event.model';
import { ProductCategoryFormComponent } from '../../../product-categories/components/product-categories-form/product-category-form.component';

@Component({
  selector: 'app-product-category-form',
  template: 'Mock Product Category Form',
  providers: [
    {
      provide: ProductCategoryFormComponent,
      useExisting: ProductCategoryFormStubComponent,
    },
  ],
})
export class ProductCategoryFormStubComponent {
  @Input() productCategory: ProductCategoryInterface | null;
  @Input() productCategoryError: Error | null;
  @Input() productCategorySubmitError: Error | null;
  @Input() isCreate: boolean;
  @Output() formSubmit = new EventEmitter<FormSubmitEvent>();

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl(''),
  });
}
