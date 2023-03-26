import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationLayoutFormComponent } from './classification-layout-form.component';

describe('ClassificationLayoutCUDComponent', () => {
  let component: ClassificationLayoutFormComponent;
  let fixture: ComponentFixture<ClassificationLayoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationLayoutFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationLayoutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
