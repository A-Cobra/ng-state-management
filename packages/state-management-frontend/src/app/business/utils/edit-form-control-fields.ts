import { Validators } from '@angular/forms';
import { CustomFormValidations } from '../../core/utils/custom-form-validations';

export const editFormControlFields = {
  displayName: ['', [Validators.required, CustomFormValidations.namePattern]],
  businessName: ['', [Validators.required, CustomFormValidations.namePattern]],
  businessClassification: ['', [Validators.required]],
  contactPhoneNumber: [
    '',
    [Validators.required, CustomFormValidations.onlyNumbers],
  ],
  contactEmail: [
    'name@domain.suffix',
    [Validators.required, CustomFormValidations.email],
  ],
  contactAddress: ['Address', [Validators.required]],
  longitude: [
    'Longitude',
    [Validators.required, CustomFormValidations.floatNumber],
  ],
  latitude: [
    'Latitude',
    [Validators.required, CustomFormValidations.floatNumber],
  ],
  imgUrl: [''],
};
