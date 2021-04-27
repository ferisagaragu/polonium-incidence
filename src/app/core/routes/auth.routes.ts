import { Routes } from '@angular/router';
import { SignInComponent } from '../../modules/auth/sign-in/sign-in.component';

export const AUTH_ROUTING: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../../modules/auth/auth.module').then(m => m.AuthModule)
  }
];

export const AUTH_ROUTING_CHILDREN: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  }
];
