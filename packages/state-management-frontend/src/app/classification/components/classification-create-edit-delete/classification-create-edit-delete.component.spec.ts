import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClassificationCreateEditDeleteComponent } from './classification-create-edit-delete.component';
import {
  ClappButtonModule,
  ClappNoResultsModule,
  ModalModule,
  ModalService,
  NotificationService,
} from '@clapp1/clapp-angular';
import { ClassificationService } from '../../services/classification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { mocksClassification } from '../../test/mocks';
import { Component, Input } from '@angular/core';
import { Classification } from '../../models/api-response.model';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'app-classification-layout-form',
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
          useClass: mocksClassification.MockModalService,
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
          useClass: mocksClassification.MockClassificationService,
        },
        {
          provide: ActivatedRoute,
          useValue: MOCK_ACTIVATED_ROUTER,
        },
      ],
    }).compileComponents();
    router = TestBed.inject(Router);
    jest.spyOn(router, 'navigate');

    fixture = TestBed.createComponent(ClassificationCreateEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    jest.spyOn(component, 'showNotificationSuccess');
    jest.spyOn(component, 'showNotificationError');
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

    expect(component.notResult).toBeFalsy();
    expect(component.classification).toEqual(
      mocksClassification.MOCK_CLASSIFICATION
    );
  });

  it('getClassificationById should not get classification by Id', () => {
    component.getClassificationById('notExistUuid');
    fixture.detectChanges();

    expect(component.notResult).toBeTruthy();
  });

  it('should call correct method in order to "edit" status', () => {
    component.status = 'edit';
    jest.spyOn(component, 'updateClassification');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(
      mocksClassification.MOCK_CLASSIFICATION
    );

    expect(component.updateClassification).toHaveBeenCalled();
  });

  it('should call correct method in order to "create" status', () => {
    component.status = 'create';
    jest.spyOn(component, 'addClassification');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(
      mocksClassification.MOCK_CLASSIFICATION
    );

    expect(component.addClassification).toHaveBeenCalled();
  });

  it('should call a default action ', () => {
    component.status = 'noExist';
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(
      mocksClassification.MOCK_CLASSIFICATION
    );

    expect(component.notResult).toBeTruthy();
    expect(component.isLoading).toBeFalsy();
  });

  it('should call correct method by "delete" status', () => {
    component.status = 'delete';
    jest.spyOn(component, 'confirmedDelete');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(
      mocksClassification.MOCK_CLASSIFICATION
    );

    expect(component.confirmedDelete).toHaveBeenCalled();
  });

  it('should create classification', () => {
    component.addClassification(
      mocksClassification.MOCK_CLASSIFICATION_TO_CREATE
    );
    fixture.detectChanges();

    expect(component.classification).toEqual(
      mocksClassification.MOCK_CLASSIFICATION
    );
    expect(component.isLoading).toBeFalsy();
    expect(component.actionNotification).toBe('created');
    expect(component.showNotificationSuccess).toHaveBeenCalled();
  });

  it('should not create classification that exist', () => {
    component.addClassification(mocksClassification.MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.actionNotification).toBe('creating');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('should update classification', () => {
    component.updateClassification(mocksClassification.MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.classification).toEqual(
      mocksClassification.MOCK_CLASSIFICATION
    );
    expect(component.isLoading).toBeFalsy();
    expect(component.actionNotification).toBe('updated');
    expect(component.showNotificationSuccess).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith([
      '/classifications',
      'detail',
      '1uuid',
    ]);
  });

  it('should not update classification', () => {
    component.updateClassification(
      mocksClassification.MOCK_CLASSIFICATION_NOT_EXIST
    );
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.actionNotification).toBe('updating');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('should delete classification', () => {
    component.deleteClassification(mocksClassification.MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.actionNotification).toBe('deleted');
    expect(component.showNotificationSuccess).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/classifications']);
  });

  it('should not delete classification', () => {
    component.deleteClassification(
      mocksClassification.MOCK_CLASSIFICATION_NOT_EXIST
    );
    fixture.detectChanges();

    expect(component.isLoading).toBeFalsy();
    expect(component.actionNotification).toBe('deleting');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('should not delete the classification if not confirmed', () => {
    jest.spyOn(component, 'deleteClassification');
    component.confirmedDelete(mocksClassification.MOCK_CLASSIFICATION);

    expect(component.deleteClassification).not.toHaveBeenCalled();
  });

  it('should delete the classification if it was confirmed', () => {
    (component['modalService'] as any).value = true;
    fixture.detectChanges();
    jest.spyOn(component, 'deleteClassification');

    component.confirmedDelete(mocksClassification.MOCK_CLASSIFICATION);

    expect(component.deleteClassification).toHaveBeenCalled();
    expect(component.deleteConfirmed).toBeTruthy();
  });

  it('should confirmation delete be undefined if value after close is not a boolean', () => {
    (component['modalService'] as any).value = 'texto';
    fixture.detectChanges();
    component.confirmedDelete(mocksClassification.MOCK_CLASSIFICATION);

    expect(component.deleteConfirmed).toBeUndefined();
  });
});

export const PARAM_MAP_MOCK = {
  get: jest.fn().mockReturnValue('1uuid'),
};

const MOCK_ACTIVATED_ROUTER = {
  snapshot: {
    data: {
      status: '',
    },
    firstChild: { data: { status: '' } },
  },
  paramMap: {
    subscribe: jest
      .fn()
      .mockImplementation((callback: any) => callback(PARAM_MAP_MOCK)),
  },
};
