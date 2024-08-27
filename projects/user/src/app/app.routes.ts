import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HomeComponent } from './view/home/home.component';

export const routes: Routes = [{
  path: '', component: ViewComponent, children:
    [
      { path: '',component:HomeComponent,pathMatch:'full'},
      { path: 'products', loadComponent: () => import('./view/product/products/products.component').then(m => m.ProductsComponent) },
      { path: 'details/:id', loadComponent: () => import('./view/product/details/details.component').then(m => m.DetailsComponent) },
      { path: 'cart', loadComponent: () => import('./view/cart/product-cart/product-cart.component').then(m => m.ProductCartComponent) },
      {
        path: 'account', children: [
          { path: 'login', loadChildren: () => import('./view/user/login/login.module').then(m => m.LoginModule) },
          { path: 'register', loadChildren: () => import('./view/user/register/register.module').then(m => m.RegisterModule) },
          { path: 'confirm-register', loadChildren: () => import('./view/user/register-confirm/register-confirm.module').then(m => m.RegisterConfirmModule) },
          { path: 'confirm-password', loadChildren: () => import('./view/user/password-confirm/password-confirm.module').then(m => m.PasswordConfirmModule) },
          { path: 'forget-password', loadChildren: () => import('./view/user/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
          { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
      }
    ]
},
{ path: '**', component: NotFoundComponent, title: '404' }
];
