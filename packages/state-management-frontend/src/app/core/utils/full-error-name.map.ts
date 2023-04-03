export const fullErrorNameMap: { [key: string]: string } = {
  required: 'This field is required',
  email:
    'The email has to have the following pattern: name@domain.suf (where suf can have 2 or 3 letters)',
  notFloatNumber: 'The number can have "+", "-", and "." symbols',
  notPhoneNumber: 'This field can contain only numbers',
  namePattern: 'This field can contain only letters and spaces',
  minlength: 'This field requires a minimum number of characters: ',
  maxlength: 'This field requires a maximum number of characters: ',
  weakPassword:
    'The password must have 8 chars min, at least 1 upper case letter, 1 number, and 1 symbol',
  notImageUrl:
    'Only URL address with a ".jpg", ".png", or ".gif" extension allowed',
  notBankNumber: 'Only letters and numbers are allowed',
};
