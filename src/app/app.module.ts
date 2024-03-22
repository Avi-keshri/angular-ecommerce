import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './seller/auth/auth.component';
import { DashboardComponent } from './seller/dashboard/dashboard.component';
import { AddProductComponent } from './seller/add-product/add-product.component';
import { UpdateProductComponent } from './seller/update-product/update-product.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from './filter.pipe';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AuthComponent,
    DashboardComponent,
    AddProductComponent,
    UpdateProductComponent,
    SearchComponent,
    FilterPipe,
    UserAuthComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbCarouselModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
