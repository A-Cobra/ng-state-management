import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'branches',
    loadChildren: () =>
      import('./branches/branches.module').then((m) => m.BranchesModule),
  },
];
