import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mockClassification } from './mockClassification';
import { Location } from '@angular/common';
import { Pagination } from '@clapp1/clapp-angular/lib/pagination/interfaces/pagination.interface';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'state-management-app-classification-main',
  templateUrl: './classification-main.component.html',
  styleUrls: ['./classification-main.component.scss'],
})
export class ClassificationMainComponent implements OnInit, OnDestroy {
  unsubscribe$ = new Subject<void>();
  currentPage = 1;
  pageSize = 9;
  categories = mockClassification;
  categoriesToShow = this.categories.slice(0, this.pageSize);
  totalRecords = this.categories.length;
  searchControl = new FormControl('');

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe((categoryName) => {
        if (categoryName === null) return;
        this.handleSubmit(categoryName);
      });
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location
  ) {}

  handleCreate(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  handleBack(): void {
    this._location.back();
  }

  handleClick(id: number): void {
    this.router.navigate([id], { relativeTo: this.route });
  }

  handlePageChange($event: Pagination): void {
    this.currentPage = $event.currentPage;
  }

  handleSubmit(query: string): void {
    let queryParams = {};
    if (query !== '') {
      queryParams = { search: query };
    }

    this.router.navigate([], {
      queryParams,
      relativeTo: this.route,
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
  }
}
