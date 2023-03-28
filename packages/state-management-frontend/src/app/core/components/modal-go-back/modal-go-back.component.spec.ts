import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClappButtonModule, ModalModule } from '@clapp1/clapp-angular';

import { ModalGoBackComponent } from './modal-go-back.component';

describe('ModalSureToLeaveComponent', () => {
  let component: ModalGoBackComponent;
  let fixture: ComponentFixture<ModalGoBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalGoBackComponent],
      imports: [ClappButtonModule, ModalModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalGoBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
