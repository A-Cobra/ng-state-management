import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Branch } from '../../models/branch.model';
import { BranchesService } from '../../services/branches.service';

import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

@Component({
  selector: 'state-management-app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss'],
})
export class BranchesComponent implements OnInit, OnDestroy {
  readonly #branchesService = inject(BranchesService);
  readonly #unsubscribe$ = new Subject<void>();
  searchBranchControl = new FormControl('');
  branches$: Observable<Branch[]>;
  totalRecords = 0;
  pageSize = 4;

  public ngOnInit(): void {
    this.branches$ = this.#branchesService.getBranches(1, this.pageSize).pipe(
      tap((response) => {
        this.totalRecords = response.meta.total;
        this.pageSize = response.meta.pageSize;
      }),
      map((response) => response.data)
    );
    this.searchBranchControl.valueChanges
      .pipe(
        takeUntil(this.#unsubscribe$),
        debounceTime(700),
        distinctUntilChanged()
      )
      .subscribe((branchName) => {
        if (branchName === null) return;
        this.searchBranch(branchName);
      });
  }

  public searchBranch(branchName: string): void {
    // TODO: implement search by branch name functionality when BE will be ready.
    this.branches$ = this.#branchesService
      .getBranches(1, this.pageSize, branchName)
      .pipe(
        tap((response) => {
          this.totalRecords = response.meta.total;
        }),
        map((response) => response.data)
      );
  }

  public changePage(event: {
    currentPage: number;
    lastPage: number;
    nextPage: number | null;
    previousPage: number | null;
  }): void {
    // TODO: Verify implementation when BE will be ready.
    this.branches$ = this.#branchesService
      .getBranches(
        event.currentPage,
        this.pageSize,
        this.searchBranchControl.value ?? ''
      )
      .pipe(map((response) => response.data));
  }

  public ngOnDestroy(): void {
    this.#unsubscribe$.next();
    this.#unsubscribe$.complete();
  }
}
