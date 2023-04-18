import { ValidationErrors } from '@angular/forms';
import { fullErrorNameMap } from '../../core/utils/full-error-name.map';
import { FullErrorNamePipe } from './full-error-name.pipe';

describe('FullErrorNamePipe Tests', () => {
  const pipe = new FullErrorNamePipe();
  const minLength = 4;
  const maxLength = 6;
  let validationError: ValidationErrors;

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return an empty string if there are no validation errors', () => {
    const transformedData = pipe.transform(null);

    expect(transformedData).toBe('');
  });

  it('if the pipe gets an error and no minlength and/or maxlength parameters', () => {
    validationError = {
      email: true,
    };
    const transformedData = pipe.transform(validationError);
    const fullErrorName = fullErrorNameMap['email'];

    expect(transformedData).toBe(fullErrorName);
  });

  it('should return a message that states the min length once we pass the parameter and the validation error is minlength', () => {
    validationError = {
      minlength: true,
    };
    const transformedData = pipe.transform(validationError, minLength);
    const fullErrorName = fullErrorNameMap['minlength'] + minLength;

    expect(transformedData).toBe(fullErrorName);
  });

  it('should return a message that states the max length once we pass the parameter and the validation error is maxlength', () => {
    validationError = {
      maxlength: true,
    };
    const transformedData = pipe.transform(
      validationError,
      minLength,
      maxLength
    );
    const fullErrorName = fullErrorNameMap['maxlength'] + maxLength;

    expect(transformedData).toBe(fullErrorName);
  });

  it("should return the same error code if the key and its value aren't in the map", () => {
    validationError = {
      anyValidationError: true,
    };
    const transformedData = pipe.transform(validationError);
    const errorCode = Object.keys(validationError)[0];

    expect(transformedData).toBe(errorCode);
  });
});
