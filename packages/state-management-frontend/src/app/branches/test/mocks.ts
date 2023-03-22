import { Branch } from '../models/branch.model';

import { Pagination } from '@clapp1/clapp-angular/lib/pagination/interfaces/pagination.interface';

export const MOCK_BRANCH: Branch = {
  name: 'Mock branch',
  image: 'https://dummyimage.com/400x400/000000/fff',
  schedule: '8:00 - 18:00',
};

export const MOCK_BRANCHES: Branch[] = [
  {
    name: 'Mock branch 1',
    image: 'https://dummyimage.com/400x400/000000/fff',
    schedule: '8:00 - 18:00',
  },
  {
    name: 'Mock branch 2',
    image: 'https://dummyimage.com/400x400/000000/fff',
    schedule: '9:00 - 19:00',
  },
];

export const MOCK_PAGINATION: Pagination = {
  currentPage: 2,
  nextPage: null,
  previousPage: 1,
  lastPage: 3,
};
