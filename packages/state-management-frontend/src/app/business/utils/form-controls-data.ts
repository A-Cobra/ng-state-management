import { FormControlsData } from '../models/create-form.model';

export const FORM_CONTROLS_DATA: FormControlsData = {
  name: {
    isRequired: true,
    pattern: '^[a-zA-ZñÑ ]+$',
    errorMessage: 'Only common characters allowed',
    maxLength: 50,
  },
  email: {
    isRequired: true,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,3}$',
    errorMessage: 'Email format is required',
    maxLength: 1000,
  },
  password: {
    isRequired: true,
    pattern:
      '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z0-9!@#$%^&*()_+]{8,}$',
    errorMessage: '8 char min, at least 1 capital letter, 1 num, 1 symbol',
    maxLength: 50,
  },
  classification: {
    isRequired: true,
    pattern: '',
    errorMessage: '',
    maxLength: 100,
  },
  address: {
    isRequired: true,
    pattern: '',
    errorMessage: '',
    maxLength: 50,
  },
  longitude: {
    isRequired: true,
    pattern:
      '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$',
    errorMessage: 'Only longitude format',
    maxLength: 8,
  },
  latitude: {
    isRequired: true,
    pattern:
      '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$',
    errorMessage: 'Only latitude format',
    maxLength: 7,
  },
  contact: {
    isRequired: true,
    pattern: '^[0-9]+$',
    errorMessage: 'Only numbers allowed',
    maxLength: 15,
  },
  picture: {
    isRequired: false,
    pattern: '^(https://[^"]*?.jpg)$',
    errorMessage: 'Only URL address with a ".jpg" extension allowed',
    maxLength: 200,
  },
  bankAccountNumber: {
    isRequired: false,
    pattern: '^[a-zA-Z0-9]+$',
    errorMessage: 'Only numbers or common characters allowed',
    maxLength: 30,
  },
  bankName: {
    isRequired: false,
    pattern: '',
    errorMessage: '',
    maxLength: 50,
  },
  bankAccountType: {
    isRequired: false,
    pattern: '',
    errorMessage: '',
    maxLength: 1000,
  },
  fullname: {
    isRequired: true,
    pattern: '',
    errorMessage: '',
    maxLength: 50,
  },
  documentId: {
    isRequired: true,
    pattern: '^[0-9]+$',
    errorMessage: 'Only numbers allowed',
    maxLength: 20,
  },
};
