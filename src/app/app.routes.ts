import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./features/dashboard.page').then((m) => m.DashboardPage),
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
