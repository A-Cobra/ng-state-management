import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationLayoutFormComponent } from './classification-layout-form.component';
import {
  ClappButtonModule,
  ClappFileUploadModule,
  ClappImageDisplayModule,
  ClappInputHelpersModule,
  ClappTextInputModule,
} from '@clapp1/clapp-angular';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import {
  MOCK_CLASSIFICATION,
  MOCK_CLASSIFICATION_TO_CREATE,
} from '../../test/mocks';

describe('ClassificationLayoutFormComponent', () => {
  let component: ClassificationLayoutFormComponent;
  let fixture: ComponentFixture<ClassificationLayoutFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClassificationLayoutFormComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        ClappTextInputModule,
        ClappFileUploadModule,
        ClappImageDisplayModule,
        ClappButtonModule,
        ClappInputHelpersModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationLayoutFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get currentStatus and icon by create status', () => {
    const spy = jest.spyOn(component, 'activateFormByStatus');
    component.status = 'create';

    fixture.detectChanges();

    expect(component.currentStatus).toBe('create');
    expect(component.iconButton).toBe('ri-add-line');
    expect(spy).toHaveBeenCalled();
  });

  it('should get currentStatus and icon by detail status ', () => {
    const spy = jest.spyOn(component, 'activateFormByStatus');
    component.status = 'detail';

    fixture.detectChanges();

    expect(component.currentStatus).toBe('detail');
    expect(component.iconButton).toBe('ri-delete-bin-line');
    expect(spy).toHaveBeenCalled();
  });

  it('should get id classification from input classification ', () => {
    component.status = 'edit';
    component.classification = MOCK_CLASSIFICATION;

    fixture.detectChanges();

    expect(component.idClassification).toBe(MOCK_CLASSIFICATION.id);
  });

  it('should set the value of "image" to the provided file', () => {
    const file = new File([''], 'test.png', { type: 'image/png' });
    component.addToFormControl(file);
    fixture.detectChanges();

    expect(component.classificationForm.get('image')?.value).toBe(file);
  });

  it('should set the value of "name" to the trimmed input', () => {
    component.changeFormatInput('   classification name   ');
    fixture.detectChanges();

    expect(component.classificationForm.get('name')?.value).toBe(
      'classification name'
    );
  });

  it('should submit form value by create status', () => {
    component.currentStatus = 'create';
    component.classificationForm.setValue(MOCK_CLASSIFICATION_TO_CREATE);
    component.submit();

    expect(
      component.classificationForm.controls['numberOfBusinesses'].disabled
    ).toBe(false);
  });

  it('should submit form value by edit status ', () => {
    component.currentStatus = 'edit';
    component.classificationForm.setValue(MOCK_CLASSIFICATION_TO_CREATE);

    component.submit();

    expect(
      component.classificationForm.controls['numberOfBusinesses'].disabled
    ).toBe(false);
  });
});
