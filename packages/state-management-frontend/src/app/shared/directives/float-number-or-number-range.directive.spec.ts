import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TestFloatNumberOrNumberRangeDirectiveComponent } from '../test/components/test-float-number-or-number-range.directive';
import { FloatNumberOrNumberRangeDirective } from './float-number-or-number-range.directive';

describe('NumberRangeDirective tests', () => {
  let component: TestFloatNumberOrNumberRangeDirectiveComponent;
  let fixture: ComponentFixture<TestFloatNumberOrNumberRangeDirectiveComponent>;
  let inputElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FloatNumberOrNumberRangeDirective,
        TestFloatNumberOrNumberRangeDirectiveComponent,
      ],
    });

    fixture = TestBed.createComponent(
      TestFloatNumberOrNumberRangeDirectiveComponent
    );
    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create an instance', () => {
    const directive = new FloatNumberOrNumberRangeDirective();
    expect(directive).toBeTruthy();
  });

  it('should hold the same value if we introduce a number', () => {
    const inputValue = '7';
    // inputElement.triggerEventHandler('input', {
    //   target: { value: inputValue },
    // });
    // inputElement.nativeElement.value = 'myValue';
    // component.testForm.controls['control'].setValue(inputValue);
    fixture.detectChanges();
    const inputReference = inputElement.nativeElement;
    console.log('inputReference.value');
    console.log(inputReference.value);

    expect(inputElement.nativeElement.nativeNode).toBe(inputElement);
  });
});
