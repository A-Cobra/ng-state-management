import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationLayoutCUDComponent } from './classification-layout-cud.component';

describe('ClassificationLayoutCUDComponent', () => {
  let component: ClassificationLayoutCUDComponent;
  let fixture: ComponentFixture<ClassificationLayoutCUDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationLayoutCUDComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationLayoutCUDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
