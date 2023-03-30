import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Classification } from '../../models/api-response.model';
import { filter, map, Subject, take, takeUntil } from 'rxjs';
import {
  ActivatedRoute,
  NavigationEnd,
  ParamMap,
  Router,
} from '@angular/router';
import { ClassificationService } from '../../services/classification.service';
import { RouteData } from '@clapp1/clapp-angular/lib/shared/interfaces/route-data.interface';
import { ModalService, NotificationService } from '@clapp1/clapp-angular';
import { ConfirmationModalComponent } from '../../../shared/components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'state-management-app-classification-create-edit-delete',
  templateUrl: './classification-create-edit-delete.component.html',
  styles: [
    ' :host {width: 100%; height: 100%} clapp-button {display: flex;justify-content: center;}',
  ],
})
export class ClassificationCreateEditDeleteComponent
  implements OnInit, OnDestroy
{
  idClassification: string;
  classification: Classification;
  status: string;
  loader = false;
  deleteConfirmed: boolean;
  noResult = false;
  actionNotification: string;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly classificationService: ClassificationService,
    private readonly notificationService: NotificationService,
    private readonly modalService: ModalService,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.router.events
      .pipe(
        takeUntil(this.unsubscribe$),
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute.snapshot;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route.data;
        })
      )
      .subscribe((data: RouteData) => {
        this.status = data['status'];
      });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      this.idClassification = params.get('id') as string;
    });

    this.status !== 'create'
      ? this.getClassificationById(this.idClassification)
      : '';
  }

  getClassificationById(id: string): void {
    this.noResult = false;
    this.classificationService.getClassificationById(id).subscribe({
      next: (data) => {
        this.noResult = false;
        this.classification = data;
      },
      error: () => {
        this.noResult = true;
      },
    });
  }

  createUpdateOrDeleteClassification(data: Classification): void {
    this.loader = true;
    switch (this.status) {
      case 'edit':
        this.updateClassification(data);
        break;
      case 'create':
        this.addClassification(data);
        break;
      case 'detail':
        this.confirmedDelete(data);
        this.loader = false;
        break;
      default:
        this.noResult = true;
        this.loader = false;
    }
  }

  addClassification(data: Classification): void {
    this.classificationService.addClassification(data).subscribe({
      next: (result: Classification) => {
        this.classification = result;
        this.handleRequestSuccess(false, 'created', [
          '/classifications',
          'detail',
          this.classification.id as string,
        ]);
      },
      error: () => {
        this.handleRequestError(false, 'creating');
        this.showNotificationError();
      },
    });
  }

  updateClassification(data: Classification) {
    this.classificationService.updateClassification(data).subscribe({
      next: (result: Classification) => {
        this.classification = result;
        this.handleRequestSuccess(false, 'updated', [
          '/classifications',
          'detail',
          this.idClassification,
        ]);
      },
      error: () => {
        this.handleRequestError(false, 'updating');
        this.showNotificationError();
      },
    });
  }

  deleteClassification(data: Classification): void {
    this.classificationService
      .deleteClassification(data.id as string)
      .subscribe({
        next: () => {
          this.handleRequestSuccess(false, 'deleted', ['/classifications']);
        },
        error: () => {
          this.handleRequestError(false, 'deleting');
          this.showNotificationError();
        },
      });
  }

  confirmedDelete(data: Classification): void {
    const modalRef = this.modalService.open(ConfirmationModalComponent, {
      data: {
        title: 'Delete classification',
        message: `Are you sure to delete the ${this.classification.name} classification`,
        confirmButtonLabel: 'Yes',
        cancelButtonLabel: 'Cancel',
      },
      width: '300px',
      height: 'fit-content',
    });
    modalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      this.loader = true;
      this.deleteConfirmed = result as boolean;
      this.deleteConfirmed
        ? this.deleteClassification(data)
        : (this.loader = false);
    });
  }

  handleRequestSuccess(
    statusLoader: boolean,
    action: string,
    path: string[]
  ): void {
    this.loader = statusLoader;
    this.actionNotification = action;
    this.showNotificationSuccess();
    this.ngZone.run(() => {
      this.router.navigate(path);
    });
  }

  handleRequestError(statusLoader: boolean, action: string): void {
    this.loader = statusLoader;
    this.actionNotification = action;
    this.showNotificationError();
  }

  showNotificationSuccess(): void {
    this.notificationService.success(
      `Classification ${this.actionNotification} successfully`,
      'Success!'
    );
  }

  showNotificationError(): void {
    this.notificationService.error(
      `There was an error when ${this.actionNotification} the classification`,
      'Unexpected error'
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
