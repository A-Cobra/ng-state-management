import { FormControl } from '@angular/forms';
export interface FormCreateGroup {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  classification: FormControl<string | null>;
  address: FormControl<string | null>;
  longitude: FormControl<string | null>;
  latitude: FormControl<string | null>;
  contact: FormControl<string | null>;
  picture: FormControl<string | null>;
  bankAccountNumber: FormControl<string | null>;
  bankName: FormControl<string | null>;
  bankAccountType: FormControl<string | null>;
  fullname: FormControl<string | null>;
  documentId: FormControl<string | null>;
}
