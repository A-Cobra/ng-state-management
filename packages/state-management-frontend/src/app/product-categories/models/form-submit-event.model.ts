export interface FormSubmitEvent {
  id: string | undefined;
  productCategory: ProductCategoryForm;
}

interface ProductCategoryForm {
  name: string;
  description: string;
}
