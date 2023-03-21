import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationCreateEditComponent } from './classification-create-edit.component';

describe('ClassificationCreateEditComponent', () => {
  let component: ClassificationCreateEditComponent;
  let fixture: ComponentFixture<ClassificationCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationCreateEditComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
