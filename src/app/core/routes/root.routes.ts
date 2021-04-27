import { Routes } from '@angular/router';

export const ROOT_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auth'
  }
];
