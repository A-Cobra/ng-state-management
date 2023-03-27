import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGoBackComponent } from './modal-go-back.component';

describe('ModalSureToLeaveComponent', () => {
  let component: ModalGoBackComponent;
  let fixture: ComponentFixture<ModalGoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalGoBackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
