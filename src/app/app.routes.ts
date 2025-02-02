import { Routes } from '@angular/router';

import { HomeComponent } from "./pages/home/home.component";
import {CategoryPageComponent} from "./pages/category-page/category-page.component";
import {ProductDetailComponent} from "./pages/product-page/product-detail.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/:category', component: CategoryPageComponent },
  { path: 'products/:category/:id/:slug', component: ProductDetailComponent }
];
