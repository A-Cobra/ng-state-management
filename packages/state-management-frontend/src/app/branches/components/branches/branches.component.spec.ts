import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { ApiResponse } from '../../models/api-response.model';
import { Branch } from '../../models/branch.model';
import { BranchCardComponent } from '../branch-card/branch-card.component';
import { BranchesComponent } from './branches.component';
import { BranchesService } from '../../services/branches.service';
import { MOCK_BRANCHES, MOCK_PAGINATION } from '../../test/mocks';

import {
  ClappButtonModule,
  ClappCardModule,
  ClappPaginationModule,
  ClappSearchModule,
} from '@clapp1/clapp-angular';
import { Observable, of, take } from 'rxjs';
import { query } from '@angular/animations';
import { By } from '@angular/platform-browser';

const mockBranchesService = {
  getBranches: jest.fn(
    (
      page = 1,
      pageSize = 10,
      _query = ''
    ): Observable<ApiResponse<Branch[]>> => {
      return of({
        data: MOCK_BRANCHES,
        meta: {
          total: MOCK_BRANCHES.length,
          page,
          pageSize,
        },
      });
    }
  ),
};

describe('BranchesComponent', () => {
  let component: BranchesComponent;
  let fixture: ComponentFixture<BranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BranchesComponent, BranchCardComponent],
      imports: [
        ClappPaginationModule,
        ClappButtonModule,
        ClappCardModule,
        ClappSearchModule,
        ReactiveFormsModule,
      ],
      providers: [
        {
          provide: BranchesService,
          useValue: mockBranchesService,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search branch by name', fakeAsync(() => {
    const branchNameControl = component.searchBranchControl;
    const searchBranchSpy = jest.spyOn(component, 'searchBranch');

    branchNameControl.setValue('test');
    tick(700);

    expect(searchBranchSpy).toHaveBeenCalledWith('test');
  }));

  it('should search branch by name an assign result properties', () => {
    component.searchBranch('test method');
    component.branches$.pipe(take(1)).subscribe((branches) => {
      expect(component.totalRecords).toBe(MOCK_BRANCHES.length);
      expect(branches).toEqual(MOCK_BRANCHES);
    });
  });

  it('should get branches by page and assign result properties', () => {
    component.pageSize = 1;
    fixture.detectChanges();
    const pagination = fixture.debugElement.query(By.css('clapp-pagination'));

    pagination.triggerEventHandler('pageChange', MOCK_PAGINATION);

    component.branches$.pipe(take(1)).subscribe((branches) => {
      expect(component.totalRecords).toBe(MOCK_BRANCHES.length);
      expect(branches).toEqual(MOCK_BRANCHES);
    });
  });
});
