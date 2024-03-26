import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cart, Product } from '../data-type';
import { BehaviorSubject, map, Subject, take, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productList = new BehaviorSubject<any>(null);
  public showItemOnCart = new Subject<Product[]>();
  public itemOnRemoteCart = new Subject<Cart[]>();

  constructor(private http: HttpClient, private route: ActivatedRoute) { }


  popularProducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=4', { observe: 'response' });
  }

  trendingproducts() {
    return this.http.get<Product[]>('http://localhost:3000/products?_limit=6', { observe: 'response' });
  }

  productDetail(id: number) {
    return this.http.get<Product>(`http://localhost:3000/products/${id}`, { observe: 'response' });
  }

  addToCartItemOnLocalStorage(product: Product) {
    let cartData = [];
    let cartItem = JSON.parse(localStorage.getItem('localCartItem'));
    if (product && !cartItem) {
      localStorage.setItem('localCartItem', JSON.stringify([product]));
      this.showItemOnCart.next([product]);
    } else {
      cartData.push(...cartItem);
      cartData.push(product);
      localStorage.setItem('localCartItem', JSON.stringify(cartData));
      this.showItemOnCart.next(cartData);
    }
  }

  addToCartItemOnRemote(cartProduct: Cart) {
    return this.http.post<Cart>('http://localhost:3000/cart', cartProduct, { observe: 'response' });
  }

  removeItemFromLocalStorage(product: Product) {
    const localCartItem = JSON.parse(localStorage.getItem('localCartItem'));
    if (localCartItem) {
      const filterItem = localCartItem.filter(element => element.id !== product.id);
      localStorage.setItem('localCartItem', JSON.stringify(filterItem));
      this.showItemOnCart.next(filterItem);
    }
  }

  productOnLocalCart(id: number) {
    const localCartItem = JSON.parse(localStorage.getItem('localCartItem'));
    if (localCartItem) {
      const filterItem = localCartItem.filter(element => element.id == id);
      return filterItem;
    }
  }

  productOnRemoteCartBasedOnUserID(userid: number) {
    return this.http.get<Cart[]>(`http://localhost:3000/cart/?userid=${userid}`, { observe: 'response' });
  }

  pdOnRemoteCartBasedOnUDPD(productid: number, userid: number) {
    return this.http.get<Cart[]>(`http://localhost:3000/cart/?id=${productid}&userid=${userid}`, { observe: 'response' });
  }


  getLocalStorageData(userid: number) {
    if (localStorage.getItem('localCartItem')) {
      const localCartItem = JSON.parse(localStorage.getItem('localCartItem'));
      if (localCartItem) {
        localCartItem.forEach(product => {
          product.userid = userid;
          this.addToCartItemOnRemote(product).pipe(take(1))
            .subscribe(res => {
              if (res.ok && res.body) {
                if (localStorage.getItem('localCartItem')) {
                  const localCartItem = JSON.parse(localStorage.getItem('localCartItem'));
                  if (localCartItem) {
                    localStorage.removeItem('localCartItem');
                    this.showItemOnCart.next([]);
                    this.productOnRemoteCartBasedOnUserID(userid).pipe(take(1))
                      .subscribe(res => {
                        this.itemOnRemoteCart.next(res.body);
                      });
                  }
                }
              }
            }, error => {
              alert('My Error ' + error);
            });
        });
      }
    }
  }

  getCartPageBasedOnUD(userid: number) {
    return this.http.get<Cart[]>(`http://localhost:3000/cart/?userid=${userid}`, { observe: 'response' });
  }

  removeProductFromCart(id: number) {
    return this.http.delete<Cart>(`http://localhost:3000/cart/${id}`, { observe: 'response' });
  }

}
