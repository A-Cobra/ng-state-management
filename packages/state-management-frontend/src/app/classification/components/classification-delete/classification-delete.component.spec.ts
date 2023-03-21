import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationDeleteComponent } from './classification-delete.component';

describe('ClassificationDeleteComponent', () => {
  let component: ClassificationDeleteComponent;
  let fixture: ComponentFixture<ClassificationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
