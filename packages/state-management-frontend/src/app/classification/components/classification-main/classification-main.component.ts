import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MOCK_CLASSIFICATIONS_LIST } from '../../test/mocks';
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
  private unsubscribe$ = new Subject<void>();
  currentPage = 1;
  pageSize = 9;
  categories = MOCK_CLASSIFICATIONS_LIST;
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
    private location: Location
  ) {}

  handleCreate(): void {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  handleBack(): void {
    this.location.back();
  }

  handleCardClick(id: string): void {
    this.router.navigate(['detail', id], { relativeTo: this.route });
  }

  handlePageChange($event: Pagination): void {
    //TODO needs to be adjusted when BE is ready
    const initialCount = ($event.currentPage - 1) * this.pageSize;
    const finalCount = this.pageSize * $event.currentPage;
    this.categoriesToShow = this.categories.slice(initialCount, finalCount);
  }

  handleSubmit(query: string): void {
    //TODO needs to be adjusted when BE is ready
    this.categories = MOCK_CLASSIFICATIONS_LIST;
    if (query !== '') {
      this.categories = this.categories.filter((category) =>
        category.name.toLowerCase().includes(query.toLowerCase())
      );
      this.totalRecords = this.categories.length;
    }
    this.categoriesToShow = this.categories.slice(0, this.pageSize);
    this.totalRecords = this.categories.length;
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
