import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OnlyNumberDirective } from './only-number.directive';
import { TestOnlyNumberDirectiveComponent } from '../test/only-number.directive.mocks';

describe('PhoneNumberDirective testing', () => {
  let floatNumberFixture: ComponentFixture<TestOnlyNumberDirectiveComponent>;
  let floatInputElement: DebugElement;

  beforeEach(() => {
    floatNumberFixture = TestBed.createComponent(
      TestOnlyNumberDirectiveComponent
    );
    floatInputElement = floatNumberFixture.debugElement.query(By.css('input'));
    floatNumberFixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new OnlyNumberDirective();
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
