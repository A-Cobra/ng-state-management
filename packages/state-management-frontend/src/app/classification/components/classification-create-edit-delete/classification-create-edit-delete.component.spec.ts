import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationCreateEditDeleteComponent } from './classification-create-edit-delete.component';
import {
  ClappButtonModule,
  ModalModule,
  ModalRef,
  ModalService,
  NotificationService,
} from '@clapp1/clapp-angular';
import { ClassificationService } from '../../services/classification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import {
  MOCK_ACTIVATED_ROUTER,
  MOCK_CLASSIFICATION,
  MOCK_CLASSIFICATION_NOT_EXIST,
  MOCK_CLASSIFICATION_SERVICE,
  MOCK_CLASSIFICATION_TO_CREATE,
} from '../../test/mocks';
import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { Classification } from '../../models/api-response.model';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
  selector: 'state-management-app-classification-layout-form',
  template: `<div>Test</div>`,
})
class MockLayoutFormComponent {
  @Input() classification: Classification;
  @Input() status: string;
}

@Component({
  selector: 'state-management-app-blank-component',
  template: '',
})
class BlankComponent {}

describe('ClassificationCreateEditDeleteComponent', () => {
  let component: ClassificationCreateEditDeleteComponent;
  let fixture: ComponentFixture<ClassificationCreateEditDeleteComponent>;
  let router: Router;
  let modalService: ModalService;
  let modalRef: ModalRef;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        ClassificationCreateEditDeleteComponent,
        MockLayoutFormComponent,
      ],
      imports: [
        ClappButtonModule,
        LoaderComponent,
        ModalModule,
        RouterTestingModule.withRoutes([
          { path: 'classifications', component: BlankComponent },
          { path: 'classifications/detail/1uuid', component: BlankComponent },
        ]),
      ],
      providers: [
        // {
        //   provide: ModalService,
        //   useValue: {
        //     open: jest.fn().mockReturnValue({
        //       afterClosed: of(false),
        //       close: of(false),
        //     })
        //   }
        // },
        ModalRef,
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
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ClassificationCreateEditDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    jest.spyOn(component, 'showNotificationSuccess');
    jest.spyOn(component, 'showNotificationError');
    jest.spyOn(router, 'navigate');
    // modalService = {
    //   open: jest.fn().mockReturnValue({ afterClosed: () => of(false) }),
    // };
    modalService = TestBed.inject(ModalService);
    modalRef = TestBed.inject(ModalRef);
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

    expect(getClassificationByIdSpy).toBeCalledTimes(0);
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

  it('Method should call correct method in order to edit ', () => {
    component.status = 'edit';
    jest.spyOn(component, 'updateClassification');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.updateClassification).toHaveBeenCalled();
  });

  it('Method should call correct method in order to create ', () => {
    component.status = 'create';
    jest.spyOn(component, 'addClassification');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.addClassification).toHaveBeenCalled();
  });

  it('Method should call a default action ', () => {
    component.status = 'noExist';
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.noResult).toBeTruthy();
    expect(component.loader).toBeFalsy();
  });

  it('Method should call correct method in order to detail ', () => {
    component.status = 'detail';
    jest.spyOn(component, 'confirmedDelete');
    fixture.detectChanges();
    component.createUpdateOrDeleteClassification(MOCK_CLASSIFICATION);

    expect(component.confirmedDelete).toHaveBeenCalled();
  });

  it('addClassification should create classification', () => {
    component.addClassification(MOCK_CLASSIFICATION_TO_CREATE);
    fixture.detectChanges();

    expect(component.classification).toEqual(MOCK_CLASSIFICATION);
    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('created');
    expect(component.showNotificationSuccess).toHaveBeenCalled();
  });

  it('addClassification should not create classification that exist', () => {
    component.addClassification(MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('creating');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('updateClassification should update classification', () => {
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

  it('updateClassification should not update classification', () => {
    component.updateClassification(MOCK_CLASSIFICATION_NOT_EXIST);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('updating');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  it('deleteClassification should delete classification', () => {
    component.deleteClassification(MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('deleted');
    expect(component.showNotificationSuccess).toHaveBeenCalled();

    expect(router.navigate).toHaveBeenCalledWith(['/classifications']);
  });

  it('deleteClassification should not delete classification', () => {
    component.deleteClassification(MOCK_CLASSIFICATION_NOT_EXIST);
    fixture.detectChanges();

    expect(component.loader).toBeFalsy();
    expect(component.actionNotification).toBe('deleting');
    expect(component.showNotificationError).toHaveBeenCalled();
  });

  //nota:pendiente

  xit('should not delete the classification if not confirmed', () => {
    // const spy = jest.spyOn(modalService, "open");
    //const spy2 = jest.spyOn(modalRef, "afterClosed");
    jest.spyOn(component, 'deleteClassification');
    component.confirmedDelete(MOCK_CLASSIFICATION);
    fixture.detectChanges();

    expect(component.deleteClassification).not.toHaveBeenCalled();
  });
});

// class MockModalRef {
//   afterClosed: Observable<boolean>;
//   beingClosed:  Observable<boolean>;
//   close:  Observable<boolean>;
//
//   constructor() {
//     this.afterClosed = of(false);
//     this.beingClosed = of(false);
//     this.close = of(false);
//
//
//   }
// }
