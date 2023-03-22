import { Injectable } from '@angular/core';

import { ApiResponse } from '../models/api-response.model';
import { Branch } from '../models/branch.model';
import { BRANCHES } from '../data/branches';

import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchesService {
  #branches: Branch[] = BRANCHES;

  getBranches(
    page = 1,
    pageSize = 10,
    query = ''
  ): Observable<ApiResponse<Branch[]>> {
    // TODO: Replace with real implementation when BE will be ready.
    let filteredBranches: Branch[];
    if (query === '') {
      filteredBranches = this.#branches;
    } else {
      filteredBranches = this.#branches.filter((branch) =>
        branch.name.toLowerCase().includes(query.toLowerCase().trim())
      );
    }

    return of({
      data: filteredBranches.slice((page - 1) * pageSize, page * pageSize),
      meta: {
        total: filteredBranches.length,
        page,
        pageSize,
      },
    });
  }
}
