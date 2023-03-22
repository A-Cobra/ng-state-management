import { FormControl, FormGroup } from '@angular/forms';

interface NameEmailPasswordGroup {
  name: FormControl<string>;
  representativeName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}
interface ClassificationGroup {
  classification: FormControl<string>;
}
interface AddressCoordinatesContactGroup {
  address: FormControl<string>;
  longitude: FormControl<string>;
  latitude: FormControl<string>;
  contact: FormControl<string>;
}
interface OptionalFieldsGroup {
  picture: FormControl<string | null>;
  bankAccountNumber: FormControl<string | null>;
  bankName: FormControl<string | null>;
  bankAccountType: FormControl<string | null>;
  fullname: FormControl<string | null>;
  documentId: FormControl<string | null>;
}

export interface FormCreateMainGroup {
  nameEmailPassword: FormGroup<NameEmailPasswordGroup>;
  classification: FormGroup<ClassificationGroup>;
  addressCoordinatesContact: FormGroup<AddressCoordinatesContactGroup>;
  optionalFields: FormGroup<OptionalFieldsGroup>;
}
