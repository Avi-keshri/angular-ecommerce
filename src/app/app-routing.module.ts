import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './seller/auth/auth.component';
import { DashboardComponent } from './seller/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '', component: HomeComponent },
  { path: 'user-auth', component: UserAuthComponent },
  { path: 'detail/:id', component: ProductDetailComponent },
  {
    path: 'seller', children: [
      { path: 'dashboard', canActivate: [authGuard], component: DashboardComponent },
      { path: 'auth', component: AuthComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'update-product/:id', component: UpdateProductComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
