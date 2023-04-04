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
export interface FormControlsData {
  name: FormControlsDataItem;
  email: FormControlsDataItem;
  password: FormControlsDataItem;
  classification: FormControlsDataItem;
  address: FormControlsDataItem;
  longitude: FormControlsDataItem;
  latitude: FormControlsDataItem;
  contact: FormControlsDataItem;
  picture: FormControlsDataItem;
  bankAccountNumber: FormControlsDataItem;
  bankName: FormControlsDataItem;
  bankAccountType: FormControlsDataItem;
  fullname: FormControlsDataItem;
  documentId: FormControlsDataItem;
}
export interface FormControlsDataItem {
  isRequired: boolean;
  pattern: string;
  errorMessage: string;
  maxLength: number;
}
