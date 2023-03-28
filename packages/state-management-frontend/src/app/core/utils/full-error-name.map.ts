export const fullErrorNameMap: { [key: string]: string } = {
  required: 'This field is required',
  email: 'The email has to have the following pattern: name@domain.suf',
  notFloatNumber: 'The number can have "+", "-", and "." symbols',
  notPhoneNumber: 'This field can contain only numbers',
  namePattern: 'This field can contain only letters and spaces',
  minlength: 'This field requires a minimum number of characters: ',
  maxlength: 'This field requires a maximum number of characters: ',
};
