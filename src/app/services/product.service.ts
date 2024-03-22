import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../data-type';
import { BehaviorSubject, map, Subject, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productList = new BehaviorSubject<any>(null);
  public showItemOnCart = new Subject<number>();

  constructor(private http: HttpClient) { }


  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/product?_limit=4', { observe: 'response' });
  }

  trendingproducts() {
    return this.http.get<Product[]>('http://localhost:3000/product?_limit=6', { observe: 'response' });
  }

  productDetail(id: number) {
    return this.http.get<Product>(`http://localhost:3000/product/${id}`, { observe: 'response' });
  }

  addToCartItem(product: Product) {
    let cartData = [];
    let cartItem = JSON.parse(localStorage.getItem('localCartItem'));
    if (product && !cartItem) {
      localStorage.setItem('localCartItem', JSON.stringify([product]));
    } else {
      cartData.push(...cartItem);
      cartData.push(product);
      localStorage.setItem('localCartItem', JSON.stringify(cartData));
    }
    this.showItemOnCart.next(cartItem.length);
  }

  removeFromCartItem(product: Product) {
    const localCartItem = JSON.parse(localStorage.getItem('localCartItem'));
    if (localCartItem) {
      const filterItem = localCartItem.filter(element => element.id !== product.id);
      localStorage.setItem('localCartItem', JSON.stringify(filterItem));
    }
    this.showItemOnCart.next(localCartItem.length);
  }

  productOnLocalCart(id: number) {
    const localCartItem = JSON.parse(localStorage.getItem('localCartItem'));
    if (localCartItem) {
      const filterItem = localCartItem.filter(element => element.id == id);
      return filterItem;
    }
  }

}
