import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationCreateEditDeleteComponent } from './classification-create-edit-delete.component';

describe('ClassificationEditDeleteComponent', () => {
  let component: ClassificationCreateEditDeleteComponent;
  let fixture: ComponentFixture<ClassificationCreateEditDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationCreateEditDeleteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationCreateEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
