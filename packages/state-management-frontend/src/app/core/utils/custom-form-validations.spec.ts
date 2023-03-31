import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NOT_VALID_IMG_URL_ERROR,
  RIMAC_NEVERA_URL,
  TestFormComponent,
  WEAK_PASSWORD_ERROR,
} from '../test/mocks';
import { CustomFormValidations } from './custom-form-validations';

describe('CustomFormValidations Tests', () => {
  let testFormFixture: ComponentFixture<TestFormComponent>;
  let testFormComponent: TestFormComponent;

  beforeEach(() => {
    testFormFixture = TestBed.createComponent(TestFormComponent);
    testFormComponent = testFormFixture.componentInstance;
  });

  it('should return null when the email is correct', () => {
    const validEmail = 'name@domain.ko';
    const emailControl = testFormComponent.testForm.controls['emailControl'];
    emailControl.setValue(validEmail);
    const validatedField = CustomFormValidations.email(emailControl);

    expect(validatedField).toBe(null);
  });

  it('should return null when the name is correct', () => {
    const validName = 'Normal Business Name';
    const nameControl = testFormComponent.testForm.controls['nameControl'];
    nameControl.setValue(validName);
    const validatedField = CustomFormValidations.namePattern(nameControl);

    expect(validatedField).toBe(null);
  });

  it('should return null when we introduce a valid float number', () => {
    const accountBalance = '+987654321.9876';
    const cashControl = testFormComponent.testForm.controls['cashControl'];
    cashControl.setValue(accountBalance);
    const validatedField = CustomFormValidations.floatNumber(cashControl);

    expect(validatedField).toBe(null);
  });

  it('should return null when we introduce a valid phone number', () => {
    const phoneNumber = '87654321';
    const phoneControl = testFormComponent.testForm.controls['phoneControl'];
    phoneControl.setValue(phoneNumber);
    const validatedField = CustomFormValidations.phoneNumber(phoneControl);

    expect(validatedField).toBe(null);
  });

  describe('Image Url Validations', () => {
    it('should return null when we introduce a valid image url', () => {
      const imgUrl = RIMAC_NEVERA_URL;
      const imgControl = testFormComponent.testForm.controls['imgControl'];
      imgControl.setValue(imgUrl);
      const validatedField = CustomFormValidations.imageUrl(imgControl);

      expect(validatedField).toBe(null);
    });

    it('should return notImageUrl ValidationError if we introduce a not valid image url', () => {
      const imgUrl = 'trollUrl';
      const imgControl = testFormComponent.testForm.controls['imgControl'];
      imgControl.setValue(imgUrl);
      const validatedField = CustomFormValidations.imageUrl(imgControl);

      expect(validatedField).toStrictEqual(NOT_VALID_IMG_URL_ERROR);
    });
  });

  describe('Password validations', () => {
    it('should return null when the pass is strong', () => {
      //Pass word required a minimum of 8 characters, at least 1 upperCase Letter,
      //and 1 symbol
      const password = 'definitelyNotMyPass3000!';
      const passwordControl =
        testFormComponent.testForm.controls['passwordControl'];
      passwordControl.setValue(password);
      const validatedField =
        CustomFormValidations.strongPassword(passwordControl);

      expect(validatedField).toStrictEqual(null);
    });

    it('should return weakPassword ValidationError when the pass is weak', () => {
      //Pass word required a minimum of 8 characters, at least 1 upperCase Letter,
      //and 1 symbol
      const password = 'definitelynotmypass';
      const passwordControl =
        testFormComponent.testForm.controls['passwordControl'];
      passwordControl.setValue(password);
      const validatedField =
        CustomFormValidations.strongPassword(passwordControl);

      expect(validatedField).toStrictEqual(WEAK_PASSWORD_ERROR);
    });
  });
});
