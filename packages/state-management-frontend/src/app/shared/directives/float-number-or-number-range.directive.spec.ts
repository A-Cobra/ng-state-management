import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  TestFloatNumberDirectiveComponent,
  TestMinNumberRangeDirectiveComponent,
  TestMaxNumberRangeDirectiveComponent,
  TestNumberRangeDirectiveComponent,
} from '../test/float-number-or-number-range.directive.mocks';
import { FloatNumberOrNumberRangeDirective } from './float-number-or-number-range.directive';

describe('For testing the floatNumberDirective', () => {
  let floatNumberFixture: ComponentFixture<TestFloatNumberDirectiveComponent>;
  let floatInputElement: DebugElement;

  beforeEach(() => {
    floatNumberFixture = TestBed.createComponent(
      TestFloatNumberDirectiveComponent
    );
    floatInputElement = floatNumberFixture.debugElement.query(By.css('input'));
    floatNumberFixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new FloatNumberOrNumberRangeDirective();
    expect(directive).toBeTruthy();
  });

  it('should hold the same value if we introduce a number', () => {
    const inputValue = '7646363464';
    const inputReference = floatInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('input'));
    floatNumberFixture.detectChanges();

    expect(inputReference.value).toBe(inputValue);
  });

  it('should hold the same value without letters if we introduce numbers and letters', () => {
    const inputValue = '7646363464dasfasf';
    const transformedInputValue = '7646363464';
    const inputReference = floatInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('input'));
    floatNumberFixture.detectChanges();

    expect(inputReference.value).toBe(transformedInputValue);
  });

  it('should return a value that can start with just one "+" or "-" symbol', () => {
    const inputValue = '++--+764636-+-+3464dasfasf';
    const transformedInputValue = '+7646363464';
    const inputReference = floatInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('input'));
    floatNumberFixture.detectChanges();

    expect(inputReference.value).toBe(transformedInputValue);
  });

  it('should return a value that contains just one dot "."', () => {
    const inputValue = '76.46.36-+.-+.3464.asfasf';
    const transformedInputValue = '76.46363464';
    const inputReference = floatInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('input'));
    floatNumberFixture.detectChanges();

    expect(inputReference.value).toBe(transformedInputValue);
  });
});
describe('For testing the numberRangeDirective', () => {
  describe('if both minValue and Max Value are specified', () => {
    let numberRangeFixture: ComponentFixture<TestNumberRangeDirectiveComponent>;
    let numberRangeElement: DebugElement;
    beforeEach(() => {
      numberRangeFixture = TestBed.createComponent(
        TestNumberRangeDirectiveComponent
      );
      numberRangeElement = numberRangeFixture.debugElement.query(
        By.css('input')
      );
      numberRangeFixture.detectChanges();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    it('should change the value to the minimum that was set if the user introduces a smaller number', () => {
      const inputReference = numberRangeElement.nativeElement;
      const inputValue = '-1504342.64ffsafasfasf-.-qeqweda789342346';
      const minValue = '-280';
      inputReference.value = inputValue;
      inputReference.dispatchEvent(new Event('input'));
      numberRangeFixture.detectChanges();

      expect(inputReference.value).toBe(minValue);
    });

    it('should change the value to the max that was set if the user introduces a greater number', () => {
      const inputReference = numberRangeElement.nativeElement;
      const inputValue = '285.3';
      const maxValue = '180';
      inputReference.value = inputValue;
      inputReference.dispatchEvent(new Event('input'));
      numberRangeFixture.detectChanges();

      expect(inputReference.value).toBe(maxValue);
    });

    it('should  return the same value if it is in between the maxValue and minValue', () => {
      const inputReference = numberRangeElement.nativeElement;
      const inputValue = '169.3';
      inputReference.value = inputValue;
      inputReference.dispatchEvent(new Event('input'));
      numberRangeFixture.detectChanges();

      expect(inputReference.value).toBe(inputValue);
    });
  });

  describe('if just the minValue was specified', () => {
    let numberRangeFixture: ComponentFixture<TestMinNumberRangeDirectiveComponent>;
    let numberRangeElement: DebugElement;
    beforeEach(() => {
      numberRangeFixture = TestBed.createComponent(
        TestMinNumberRangeDirectiveComponent
      );
      numberRangeElement = numberRangeFixture.debugElement.query(
        By.css('input')
      );
      numberRangeFixture.detectChanges();
    });
    it('should change the value to the minimum that was set if the user introduces a smaller number', () => {
      const inputReference = numberRangeElement.nativeElement;
      const inputValue = '-1504342.64ffsafasfasf-.-qeqweda789342346';
      const minValue = '-280';
      inputReference.value = inputValue;
      inputReference.dispatchEvent(new Event('input'));
      numberRangeFixture.detectChanges();

      expect(inputReference.value).toBe(minValue);
    });

    it('should  return the same value if it is greater than the minValue', () => {
      const inputReference = numberRangeElement.nativeElement;
      const inputValue = '-169.3';
      inputReference.value = inputValue;
      inputReference.dispatchEvent(new Event('input'));
      numberRangeFixture.detectChanges();

      expect(inputReference.value).toBe(inputValue);
    });
  });

  describe('if just the max was specified', () => {
    let numberRangeFixture: ComponentFixture<TestMaxNumberRangeDirectiveComponent>;
    let numberRangeElement: DebugElement;
    beforeEach(() => {
      numberRangeFixture = TestBed.createComponent(
        TestMaxNumberRangeDirectiveComponent
      );
      numberRangeElement = numberRangeFixture.debugElement.query(
        By.css('input')
      );
      numberRangeFixture.detectChanges();
    });
    it('should change the value to the minimum that was set if the user introduces a smaller number', () => {
      const inputReference = numberRangeElement.nativeElement;
      const inputValue = '235.78';
      const maxValue = '180';
      inputReference.value = inputValue;
      inputReference.dispatchEvent(new Event('input'));
      numberRangeFixture.detectChanges();

      expect(inputReference.value).toBe(maxValue);
    });

    it('should  return the same value if it is greater than the minValue', () => {
      const inputReference = numberRangeElement.nativeElement;
      const inputValue = '169.3';
      inputReference.value = inputValue;
      inputReference.dispatchEvent(new Event('input'));
      numberRangeFixture.detectChanges();

      expect(inputReference.value).toBe(inputValue);
    });
  });
});
