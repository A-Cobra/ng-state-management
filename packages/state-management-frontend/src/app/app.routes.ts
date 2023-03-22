import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'businesses',
    loadChildren: () =>
      import('./business/business.module').then((m) => m.BusinessModule),
  },
];
