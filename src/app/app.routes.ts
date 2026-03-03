import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {
    path: '',

    loadComponent: () =>
      import('./views/dashboard/dashboard.component').then(
        (m) => m.DashboardComponent,
      ),
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./views/products/products.component').then(
        (m) => m.ProductsComponent,
      ),
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./views/users/users.component').then((m) => m.UsersComponent),
  },
];
