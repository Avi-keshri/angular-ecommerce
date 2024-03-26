import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { login, Product, signUp } from '../data-type';
import { BehaviorSubject, take } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).pipe(take(1))
      .subscribe(result => {
        if (result.ok) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller/dashboard']);
        }
        console.log(result);
      }, error => {
        alert("My Error: " + error);
      });
  }

  reloadSeller() {
    const seller = JSON.parse(localStorage.getItem('seller'));
    if (seller != null) {
      this.isSellerLoggedIn.next(true);
      this.router.navigate(['seller/dashboard']);
    }
  }

  userLogin(data: login) {
    this.http.get<login>(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).pipe(take(1))
      .subscribe(result => {
        console.log(result);
        if (result.ok && result.body) {
          this.isSellerLoggedIn.next(true);
          localStorage.setItem('seller', JSON.stringify(result.body));
          this.router.navigate(['seller/dashboard']);
        }
      }, error => {
        alert("My Error: " + error);
      });
  }

  getProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products', { observe: 'response' });
  }

  addSellerProduct(data: Product) {
    return this.http.post<Product>('http://localhost:3000/products', data, { observe: 'response' });
  }

  showSellerProduct(id: number) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`, { observe: 'response' });
  }

  updateSellerProduct(data: Product, id: number) {
    return this.http.put<Product>(`http://localhost:3000/products/${id}`, data, { observe: 'response' });
  }

  deleteItem(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`, { observe: 'response' });
  }
}
