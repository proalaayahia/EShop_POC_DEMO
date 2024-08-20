import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { AdminComponent } from '../../../admin/src/app/admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [{
  path: '', component: ViewComponent, children:
    [
      { path: '', loadComponent: () => import('./view/home/home.component').then(m => m.HomeComponent) },
      { path: 'products', loadComponent: () => import('./view/product/products/products.component').then(m => m.ProductsComponent) },
      { path: 'details/:id', loadComponent: () => import('./view/product/details/details.component').then(m => m.DetailsComponent) },
      { path: 'cart', loadComponent: () => import('./view/cart/product-cart/product-cart.component').then(m => m.ProductCartComponent) },
      { path: 'login', loadComponent: () => import('./view/user/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./view/user/register/register.component').then(m => m.RegisterComponent) },
      { path: 'confirm-register', loadComponent: () => import('./view/user/register-confirm/register-confirm.component').then(m => m.RegisterConfirmComponent) },
      { path: 'confirm-password', loadComponent: () => import('./view/user/password-confirm/password-confirm.component').then(m => m.PasswordConfirmComponent) },
      { path: 'forget-password', loadComponent: () => import('./view/user/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) }
    ]
},
{ path: '**', component: NotFoundComponent, title: '404' }
];
