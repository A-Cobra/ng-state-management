import { Component } from '@angular/core';
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

@Component({
  selector: 'state-management-app-classification-edit-delete',
  templateUrl: './classification-edit-delete.component.html',
  styleUrls: ['./classification-edit-delete.component.scss'],
})
export class ClassificationEditDeleteComponent {
  idClassification: string;
  classification: Classification;
  status: string;
  unsubscribe$: Subject<void> = new Subject<void>();
  constructor(
    private activatedRoute: ActivatedRoute,
    private readonly classificationService: ClassificationService,
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
    if (this.status === 'edit') {
      this.updateClassification(data);
    } else {
      this.deleteClassification(data);
    }
  }

  updateClassification(data: Classification) {
    this.classificationService.updateClassification(data).subscribe({
      next: (result: Classification) => {
        this.classification = result;
        console.log('update', this.classification);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  deleteClassification(data: Classification) {
    this.classificationService
      .deleteClassification(data.id as string)
      .subscribe({
        next: (result) => {
          console.log('delete', result);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
}
