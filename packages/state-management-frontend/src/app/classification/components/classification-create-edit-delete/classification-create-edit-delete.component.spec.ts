import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificationCreateEditDeleteComponent } from './classification-create-edit-delete.component';
import {
  ClappButtonModule,
  ClappNoResultsModule,
  ModalModule,
  ModalService,
  NotificationService,
} from '@clapp1/clapp-angular';
import {
  ClassificationService,
  MOCK_ACTIVATED_ROUTER,
} from '../../services/classification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import {
  MOCK_CLASSIFICATION,
  MOCK_CLASSIFICATION_NOT_EXIST,
  MOCK_CLASSIFICATION_SERVICE,
  MOCK_CLASSIFICATION_TO_CREATE,
  MockModalService,
} from '../../test/mocks';
import { Component, Input } from '@angular/core';
import { Classification } from '../../models/api-response.model';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'state-management-app-classification-layout-form',
  template: '',
})
class MockLayoutFormComponent {
  @Input() classification: Classification;
  @Input() status: string;
}

describe('ClassificationCreateEditDeleteComponent', () => {
  let component: ClassificationCreateEditDeleteComponent;
  let fixture: ComponentFixture<ClassificationCreateEditDeleteComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ClassificationCreateEditDeleteComponent,
        MockLayoutFormComponent,
      ],
      imports: [
        ClappButtonModule,
        ClappNoResultsModule,
        LoaderComponent,
        ModalModule,
        RouterTestingModule.withRoutes([
          { path: 'classifications', component: MockLayoutFormComponent },
          {
            path: 'classifications/detail/1uuid',
            component: MockLayoutFormComponent,
          },
        ]),
      ],
      providers: [
        {
          provide: ModalService,
          useClass: MockModalService,
        },
        {
          provide: NotificationService,
          useValue: {
            success: jest.fn(() => 'Success!'),
            error: jest.fn(() => 'Unexpected error'),
          },
        },
        {
          provide: ClassificationService,
          useValue: MOCK_CLASSIFICATION_SERVICE,
        },
        {
          provide: ActivatedRoute,
          useValue: MOCK_ACTIVATED_ROUTER,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationCreateEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);

    jest.spyOn(component, 'showNotificationSuccess');
    jest.spyOn(component, 'showNotificationError');
    jest.spyOn(router, 'navigate');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not call getClassificationById() when status is "create"', () => {
    component.status = 'create';
    const getClassificationByIdSpy = jest.spyOn(
      component,
      'getClassificationById'
    );
    component.ngOnInit();
    fixture.detectChanges();

    expect(getClassificationByIdSpy).not.toHaveBeenCalled();
  });

  it('getClassificationById should get classification by Id', () => {
    component.getClassificationById('1uuid');
    fixture.detectChanges();

    expect(component.noResult).toBeFalsy();
    expect(component.classification).toEqual(MOCK_CLASSIFICATION);
  });

  it('getClassificationById should not get classification by Id', () => {
    component.getClassificationById('notExistUuid');
    fixture.detectChanges();

    expect(component.noResult).toBeTruthy();
  });

  it('should call correct method in order to "edit" status', () => {
    component.status = 'edit';
    jest.spyOn(component, 'updateClassification');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.updateClassification).toHaveBeenCalled();
  });

  it('should call correct method in order to "create" status', () => {
    component.status = 'create';
    jest.spyOn(component, 'addClassification');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.addClassification).toHaveBeenCalled();
  });

  it('should call a default action ', () => {
    component.status = 'noExist';
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.noResult).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });

  it('should call correct method by "detail" status', () => {
    component.status = 'detail';
    jest.spyOn(component, 'confirmedDelete');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.confirmedDelete).toHaveBeenCalled();
  });

  it('should create classification', () => {
    component.addClassification(MOCK_CLASSIFICATION_TO_CREATE);
    fixture.detectChanges();

    expect(component.classification).toEqual(MOCK_CLASSIFICATION);
    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('created');
    expect(component.showNotificationSuccess).toHaveBeenCalled();
  });

  it('should not create classification that exist', () => {
    component.addClassification(MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('creating');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('should update classification', () => {
    component.updateClassification(MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.classification).toEqual(MOCK_CLASSIFICATION);
    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('updated');
    expect(component.showNotificationSuccess).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith([
      '/classifications',
      'detail',
      '1uuid',
    ]);
  });

  it('should not update classification', () => {
    component.updateClassification(MOCK_CLASSIFICATION_NOT_EXIST);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('updating');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('should delete classification', () => {
    component.deleteClassification(MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('deleted');
    expect(component.showNotificationSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/classifications']);
  });

  it('should not delete classification', () => {
    component.deleteClassification(MOCK_CLASSIFICATION_NOT_EXIST);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('deleting');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('should not delete the classification if not confirmed', () => {
    jest.spyOn(component, 'deleteClassification');
    component.confirmedDelete(MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.deleteClassification).not.toHaveBeenCalled();
  });

  it('should delete the classification if it was confirmed', () => {
    (component['modalService'] as any).value = true;
    fixture.detectChanges();
    jest.spyOn(component, 'deleteClassification');

    component.confirmedDelete(MOCK_CLASSIFICATION);

    expect(component.deleteClassification).toHaveBeenCalled();
    expect(component.deleteConfirmed).toBeTruthy();
  });
});
