import { TestBed } from '@angular/core/testing';

import { BRANCHES } from '../data/branches';
import { BranchesService } from './branches.service';

import { map, take } from 'rxjs';

describe('BranchesService', () => {
  let service: BranchesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BranchesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of branches', (done) => {
    service
      .getBranches()
      .pipe(take(1))
      .subscribe((response) => {
        expect(response.data).toEqual(BRANCHES);
        done();
      });
  });

  it('should return a list of branches filtered by query', (done) => {
    service
      .getBranches(1, 10, 'san')
      .pipe(
        take(1),
        map((response) => response.data)
      )
      .subscribe((branches) => {
        expect(branches.length).toBe(2);
        done();
      });
  });
});
