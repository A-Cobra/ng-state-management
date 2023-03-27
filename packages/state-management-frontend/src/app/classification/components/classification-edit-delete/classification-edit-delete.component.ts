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

@Component({
  selector: 'state-management-app-classification-edit-delete',
  templateUrl: './classification-edit-delete.component.html',
  styleUrls: ['./classification-edit-delete.component.scss'],
})
export class ClassificationEditDeleteComponent implements OnInit, OnDestroy {
  idClassification: string;
  classification: Classification;
  status: string;
  loader = false;
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
        console.log('this.status', this.status);
      });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.idClassification = id as string;
    });

    this.getClassificationById(this.idClassification);
  }

  getClassificationById(id: string) {
    this.classificationService.getClassificationById(id).subscribe({
      next: (data) => {
        this.classification = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  updateOrDeleteClassification(data: Classification) {
    this.loader = true;

    if (this.status === 'edit') {
      this.updateClassification(data);
    }
    if (this.status === 'create') {
      this.addClassification(data);
    }
    if (this.status === 'detail') {
      this.loader = true;
      // this.modalService.open(ConfirmationModalComponent, {
      //   data: {
      //     title:'title',
      //     message: 'message',
      //   }
      // })
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
        console.log('update', this.classification);
        this.loader = false;
        this.notificationService.success(
          'Classification updated successfully',
          'Success!'
        );
      },
      error: (error) => {
        console.log(error);
        this.loader = false;
        this.notificationService.error(
          'There was an error when updating the classification',
          'Unexpected error'
        );
      },
    });
  }

  deleteClassification(data: Classification) {
    this.classificationService
      .deleteClassification(data.id as string)
      .subscribe({
        next: (result) => {
          console.log('delete', result);
          this.loader = false;
          this.notificationService.success(
            'Classification deleted successfully',
            'Success!'
          );
        },
        error: (error) => {
          console.log(error);
          this.loader = false;
          this.notificationService.error(
            'There was an error when deleting the classification',
            'Unexpected error'
          );
        },
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
