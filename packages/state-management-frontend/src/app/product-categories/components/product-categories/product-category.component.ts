import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductCategoriesService } from '../../services/product-categories.service';
import { UnsavedForm } from '../../../shared/models/unsaved-form.model';

import {
  catchError,
  EMPTY,
  ignoreElements,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';

import { FormSubmitEvent } from '../../models/form-submit-event.model';
import { ProductCategoryFormComponent } from '../product-categories-form/product-category-form.component';
import { ProductCategoryInterface } from '@state-management-app/types';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-category.component.html',
  styles: ['h2 {margin-bottom: 1rem; text-align: center}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCategoryComponent implements OnInit, UnsavedForm {
  @ViewChild(ProductCategoryFormComponent, { static: true })
  private readonly productCategoryForm: ProductCategoryFormComponent;
  readonly #activatedRoute = inject(ActivatedRoute);
  readonly #productCategoriesService = inject(ProductCategoriesService);
  readonly #router = inject(Router);
  productCategory$: Observable<ProductCategoryInterface>;
  productCategoryError$: Observable<Error>;
  productCategorySubmitError$: Observable<Error>;
  isCreateMode = false;
  skipConfirmation = false;

  ngOnInit(): void {
    this.productCategory$ = this.#activatedRoute.paramMap.pipe(
      switchMap((paramMap) => {
        const productCategoryId = paramMap.get('id');
        if (!productCategoryId) {
          this.isCreateMode = true;
          return EMPTY;
        }

        return this.#productCategoriesService.getProductCategory(
          productCategoryId
        );
      })
    );
    this.productCategoryError$ = this.productCategory$.pipe(
      ignoreElements(),
      catchError((error) => of(error))
    );
  }

  onFormSubmit(event: FormSubmitEvent): void {
    const { id, productCategory } = event;
    if (this.isCreateMode) {
      this.isCreateMode = false;
      this.productCategory$ = this.#productCategoriesService
        .createProductCategory(productCategory)
        .pipe(
          tap({
            next: (createdProductCategory) => {
              this.skipConfirmation = true;
              return this.#router.navigate([
                '/product-categories',
                createdProductCategory.id,
              ]);
            },
            error: () => {
              this.isCreateMode = true;
              this.skipConfirmation = false;
            },
          })
        );
    } else if (!this.isCreateMode && id) {
      this.productCategory$ =
        this.#productCategoriesService.updateProductCategory(
          id,
          productCategory
        );
    }

    this.productCategorySubmitError$ = this.productCategory$.pipe(
      ignoreElements(),
      catchError((error) => {
        return of(error);
      })
    );
  }

  isFormSaved(): boolean {
    return this.productCategoryForm.form.pristine || this.skipConfirmation;
  }
}
