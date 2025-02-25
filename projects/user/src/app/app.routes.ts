import { Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { DetailsResolver } from './core/resolvers/details.resolver';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './view/home/home.component';

const accounts_children: Routes = [
  { path: 'login', loadChildren: () => import('./view/user/login/login.module').then(m => m.LoginModule) },
  { path: 'register', loadChildren: () => import('./view/user/register/register.module').then(m => m.RegisterModule) },
  { path: 'confirm-register', loadChildren: () => import('./view/user/register-confirm/register-confirm.module').then(m => m.RegisterConfirmModule) },
  { path: 'confirm-password', loadChildren: () => import('./view/user/password-confirm/password-confirm.module').then(m => m.PasswordConfirmModule) },
  { path: 'forget-password', loadChildren: () => import('./view/user/forget-password/forget-password.module').then(m => m.ForgetPasswordModule) },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
const accounts: Routes = [
  {
    path: 'account', children: accounts_children
  }
]
const products: Routes = [
  {
    path: 'products', loadComponent: () => import('./view/product/products/products.component').then(m => m.ProductsComponent),
    canMatch: [AuthGuard]
  },
  {
    path: 'details/:id', loadChildren: () => import('./view/product/details/details.module').then(m => m.DetailsModule), resolve: { product: DetailsResolver }
    , canMatch: [AuthGuard]
  },
  {
    path: 'cart', loadChildren: () => import('./view/cart/product-cart.module').then(m => m.ProductCartModule),
    canMatch: [AuthGuard]
  },
]
export const routes: Routes = [{
  path: '', component: ViewComponent, children:
    [
      ...products,
      ...accounts,
      { path: 'home', component: HomeComponent },
      { path: '', component: HomeComponent, pathMatch: 'full' },
    ]
},
{ path: '**', component: NotFoundComponent, title: '404' }
];
