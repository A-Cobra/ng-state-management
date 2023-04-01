import { Component, OnDestroy, OnInit } from '@angular/core';
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
  isLoading = false;
  deleteConfirmed: boolean;
  notResult = false;
  actionNotification: string;
  unsubscribe$: Subject<void> = new Subject<void>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly classificationService: ClassificationService,
    private readonly notificationService: NotificationService,
    private readonly modalService: ModalService,
    private router: Router
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

    if (this.status !== 'create') {
      this.getClassificationById(this.idClassification);
    }
  }

  getClassificationById(id: string): void {
    this.isLoading = true;
    this.notResult = false;
    this.classificationService.getClassificationById(id).subscribe({
      next: (data) => {
        this.classification = data;
        this.isLoading = false;
        this.notResult = false;
      },
      error: () => {
        this.notResult = true;
        this.isLoading = false;
      },
    });
  }

  createUpdateOrDeleteClassification(data: Classification): void {
    this.isLoading = true;
    switch (this.status) {
      case 'edit':
        this.updateClassification(data);
        break;
      case 'create':
        this.addClassification(data);
        break;
      case 'delete':
        this.confirmedDelete(data);
        this.isLoading = false;
        break;
      default:
        this.isLoading = false;
        this.notResult = true;
    }
  }

  addClassification(data: Classification): void {
    this.classificationService.addClassification(data).subscribe({
      next: (result: Classification) => {
        this.classification = result;
        this.handleRequestSuccess(false, 'created', [
          '/classifications',
          'detail',
          result.id as string,
        ]);
      },
      error: () => {
        this.handleRequestError(false, 'creating');
        this.showNotificationError();
      },
    });
  }

  updateClassification(data: Classification): void {
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
      width: '400px',
      height: 'fit-content',
    });
    modalRef.afterClosed.pipe(take(1)).subscribe((result) => {
      if (typeof result !== 'boolean') return;
      this.isLoading = true;
      this.deleteConfirmed = result;
      this.deleteConfirmed
        ? this.deleteClassification(data)
        : (this.isLoading = false);
    });
  }

  handleRequestSuccess(
    statusLoader: boolean,
    action: string,
    path: string[]
  ): void {
    this.isLoading = statusLoader;
    this.actionNotification = action;
    this.showNotificationSuccess();
    this.router.navigate(path);
  }

  handleRequestError(statusLoader: boolean, action: string): void {
    this.isLoading = statusLoader;
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
