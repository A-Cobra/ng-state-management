import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationCreateComponent } from './classification-create.component';

describe('ClassificationCreateComponent', () => {
  let component: ClassificationCreateComponent;
  let fixture: ComponentFixture<ClassificationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationCreateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
