import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TrimTextDirective } from './trim-text.directive';
import { TrimTextMockComponent } from '../test/mocks/trim-text.directive.mocks';

describe('TrimTextDirective', () => {
  let fixture: ComponentFixture<TrimTextMockComponent>;
  let componentInputElement: DebugElement;

  let directive: TrimTextDirective;
  beforeEach(() => {
    fixture = TestBed.createComponent(TrimTextMockComponent);
    directive = new TrimTextDirective();
    componentInputElement = fixture.debugElement.query(By.css('input'));
    fixture.detectChanges();
  });
  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should trim the value correctly', () => {
    const trimmedValue = directive.trimText('  hello world  ');
    expect(trimmedValue).toBe('hello world');
  });

  it('should return trimmed value', () => {
    const inputValue = '      hello    ';
    const transformedInputValue = 'hello';
    const inputReference = componentInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(inputReference.value).toBe(transformedInputValue);
  });

  it('should return same value', () => {
    const inputValue = 'hello';
    const inputReference = componentInputElement.nativeElement;
    inputReference.value = inputValue;
    inputReference.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(inputReference.value).toBe(inputValue);
  });
});
