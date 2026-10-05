import { Routes } from '@angular/router';
import { MainLayout } from './layout/main-layout/main-layout';

export const routes: Routes = [
  { path: 'identity', loadChildren: () => import('./features/identity/identity.routes') },
  {
    path: '',
    component: MainLayout,
    children: [
      // aquí irán las demás features
    ],
  },
];
