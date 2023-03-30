import { Branch } from '../models/branch.model';

export const MOCK_BRANCH: Branch = {
  name: 'Mock branch',
  image: 'https://dummyimage.com/400x400/000000/fff',
  openingTime: '10:00',
  closeTime: '19:00',
};

export const MOCK_BRANCHES: Branch[] = [
  {
    name: 'Mock branch 1',
    image: 'https://dummyimage.com/400x400/000000/fff',
    openingTime: '10:00',
    closeTime: '19:00',
  },
  {
    name: 'Mock branch 2',
    image: 'https://dummyimage.com/400x400/000000/fff',
    openingTime: '10:00',
    closeTime: '19:00',
  },
];
