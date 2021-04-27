import { Routes } from '@angular/router';

export const DASHBOARD_ROUTING: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  }
];

/*export const DASHBOARD_ROUTING_CHILDREN: Routes = [
  {
    path: '',
    component: TabQuoteComponent
  }
];*/
