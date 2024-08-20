import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
    {
        path: 'admin', component: AdminComponent, children:
            [
                { path: '', pathMatch: 'full', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
                { path: 'dashboard', loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent) },
                { path: 'products', loadComponent: () => import('./admin/products/products.component').then(m => m.ProductsComponent) }
            ]
    }
];
