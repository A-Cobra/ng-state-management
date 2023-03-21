import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationEditComponent } from './classification-edit.component';

describe('ClassificationEditComponent', () => {
  let component: ClassificationEditComponent;
  let fixture: ComponentFixture<ClassificationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
