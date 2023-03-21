import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'classification',
    loadChildren: () =>
      import('./classification/classification.module').then(
        (m) => m.ClassificationModule
      ),
  },
];
