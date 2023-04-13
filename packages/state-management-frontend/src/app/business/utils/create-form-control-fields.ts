import { Validators } from '@angular/forms';
import { CustomFormValidations } from '../../core/utils/custom-form-validations';

export const createFormControlFields = {
  name: ['', [Validators.required, CustomFormValidations.namePattern]],
  email: ['', [Validators.required, CustomFormValidations.email]],
  password: ['', [Validators.required, CustomFormValidations.strongPassword]],
  classification: ['', [Validators.required]],
  address: ['', [Validators.required]],
  longitude: ['', [Validators.required, CustomFormValidations.floatNumber]],
  latitude: ['', [Validators.required, CustomFormValidations.floatNumber]],
  contact: ['', [Validators.required, CustomFormValidations.onlyNumbers]],
  picture: [''],
  bankAccountNumber: ['', CustomFormValidations.bankNumber],
  bankName: [''],
  bankAccountType: [''],
  fullname: ['', [Validators.required]],
  documentId: ['', [Validators.required, CustomFormValidations.onlyNumbers]],
};
