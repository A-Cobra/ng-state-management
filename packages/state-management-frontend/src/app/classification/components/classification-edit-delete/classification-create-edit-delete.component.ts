import { Component, OnDestroy, OnInit } from '@angular/core';
import { Classification } from '../../models/api-response.model';
import { filter, map, Subject, takeUntil } from 'rxjs';
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
  selector: 'state-management-app-classification-edit-delete',
  templateUrl: './classification-create-edit-delete.component.html',
  styleUrls: ['./classification-create-edit-delete.component.scss'],
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
      const id = params.get('id');

      if (id) {
        this.idClassification = id;
        this.noResult = false;
      } else {
        this.noResult = true;
      }
    });
    this.getClassificationById(this.idClassification);
  }

  getClassificationById(id: string) {
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

  updateOrDeleteClassification(data: Classification) {
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
        this.loader = false;
        this.notificationService.success(
          'Classification created successfully',
          'Success!'
        );
      },
      error: (error) => {
        console.log(error);
        this.loader = false;
        this.notificationService.error(
          'There was an error when creating the classification',
          'Unexpected error'
        );
      },
    });
  }

  updateClassification(data: Classification) {
    this.classificationService.updateClassification(data).subscribe({
      next: (result: Classification) => {
        this.classification = result;
        this.loader = false;
        this.notificationService.success(
          'Classification updated successfully',
          'Success!'
        );
        this.router.navigate([
          '../../classifications',
          'detail',
          this.idClassification,
        ]);
      },
      error: () => {
        this.loader = false;
        this.notificationService.error(
          'There was an error when updating the classification',
          'Unexpected error'
        );
      },
    });
  }

  deleteClassification(data: Classification): void {
    this.classificationService
      .deleteClassification(data.id as string)
      .subscribe({
        next: () => {
          this.loader = false;
          this.notificationService.success(
            'Classification deleted successfully',
            'Success!'
          );
          this.router.navigate(['../../classifications']);
        },
        error: () => {
          this.loader = false;
          this.notificationService.error(
            'There was an error when deleting the classification',
            'Unexpected error'
          );
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
    modalRef.afterClosed.subscribe((result) => {
      this.loader = true;
      this.deleteConfirmed = result as boolean;
      if (this.deleteConfirmed) {
        this.deleteClassification(data);
      } else {
        this.loader = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
