import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationEditDeleteComponent } from './classification-edit-delete.component';

describe('ClassificationEditDeleteComponent', () => {
  let component: ClassificationEditDeleteComponent;
  let fixture: ComponentFixture<ClassificationEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationEditDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
