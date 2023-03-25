export const fullErrorNameMap: { [key: string]: string } = {
  required: 'This field is required',
  email: 'The email has to have the following pattern: name@domain.suf',
  notFloatNumber:
    'The number can have "+", "-", and "." symbols as well as numbers',
  notDecimalNumber: 'This field can contain only numbers',
  namePattern: 'This field can contain only letters and spaces',
};
