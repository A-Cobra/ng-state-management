import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSureToLeaveComponent } from './modal-sure-to-leave.component';

describe('ModalSureToLeaveComponent', () => {
  let component: ModalSureToLeaveComponent;
  let fixture: ComponentFixture<ModalSureToLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalSureToLeaveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSureToLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
