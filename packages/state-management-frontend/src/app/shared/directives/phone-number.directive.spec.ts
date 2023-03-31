import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestPhoneNumberDirectiveComponent } from '../test/phone-number.directive.mocks';
import { PhoneNumberDirective } from './phone-number.directive';

describe('PhoneNumberDirective testing', () => {
  let floatNumberFixture: ComponentFixture<TestPhoneNumberDirectiveComponent>;
  let floatInputElement: DebugElement;

  beforeEach(() => {
    floatNumberFixture = TestBed.createComponent(
      TestPhoneNumberDirectiveComponent
    );
    floatInputElement = floatNumberFixture.debugElement.query(By.css('input'));
    floatNumberFixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new PhoneNumberDirective();
    expect(directive).toBeTruthy();
  });

  it('should return the same value if we just introduced numbers', () => {
    const inputValue = '7646363464';
    const transformedInputValue = '7646363464';
    const inputReference = floatInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('input'));
    floatNumberFixture.detectChanges();

    expect(inputReference.value).toBe(transformedInputValue);
  });

  it('should return the same value just keeping the numbers', () => {
    const inputValue = '764.,+6363fasdfq464das8';
    const transformedInputValue = '76463634648';
    const inputReference = floatInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('input'));
    floatNumberFixture.detectChanges();

    expect(inputReference.value).toBe(transformedInputValue);
  });
});
