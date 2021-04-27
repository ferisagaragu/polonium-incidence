import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ROOT_ROUTES } from './core/routes/root.routes';
import { AUTH_ROUTING } from './core/routes/auth.routes';
import { DASHBOARD_ROUTING } from './core/routes/dashboard.routes';

const routes: Routes = [
  ...ROOT_ROUTES,
  ...AUTH_ROUTING,
  ...DASHBOARD_ROUTING
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
