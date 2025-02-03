import { Routes } from '@angular/router';

import { HomeComponent } from "./pages/home/home.component";
import {CategoryPageComponent} from "./pages/category-page/category-page.component";
import {ProductDetailComponent} from "./pages/product-page/product-detail.component";
import { LoginComponent } from "./pages/account-page/login/login.component";
import { RegisterComponent } from "./pages/account-page/register/register.component";
import { AuthGuard } from "./guards/auth.guard";
import { AccountComponent } from "./pages/account-page/account/account.component";
import { GuestGuard } from "./guards/guest.guard";
import { CartPageComponent } from "./pages/cart-page/cart-page.component";
import { CheckoutPageComponent } from "./pages/checkout-page/checkout-page.component";
import { DashboardProductsComponent } from "./pages/dashboard/products-page/dashboard-products.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: CategoryPageComponent, runGuardsAndResolvers: 'always' },
  { path: 'products/:category', component: CategoryPageComponent, runGuardsAndResolvers: 'always' },
  { path: 'products/:category/:id', component: ProductDetailComponent, runGuardsAndResolvers: 'always' },

  { path: 'cart', component: CartPageComponent },

  { path: 'checkout', component: CheckoutPageComponent },

  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'account/login', component: LoginComponent, canActivate: [GuestGuard] },
  { path: 'account/register', component: RegisterComponent, canActivate: [GuestGuard] },

  { path: 'dashboard/products', component: DashboardProductsComponent, canActivate: [AuthGuard] },


  { path: '**', redirectTo: '' },
];
