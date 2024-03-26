import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Cart, Product } from '../data-type';
import { take } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  productItem: Product;
  cartItem: Cart;
  productQuantity: number = 1;
  itemOnCartExist: boolean = false;
  userid: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialiZation();
    this.countCartProductFromRemote();
  }

  handleQuantity(type: string) {
    if (type === 'plus' && this.productQuantity < 20) {
      this.productQuantity += 1;
    } else if (type === 'minus' && this.productQuantity > 1) {
      this.productQuantity -= 1;
    }
  }

  addToCart() {
    if (this.productItem) {
      this.productItem.quantity = this.productQuantity;
      if (localStorage.getItem('user')) {
        let userData = JSON.parse(localStorage.getItem('user'))[0];
        this.userid = userData.id;
        this.cartItem = {
          ...this.productItem,
          userid: userData.id,
        }
        this.productService.addToCartItemOnRemote(this.cartItem).pipe(take(1))
          .subscribe(res => {
            if (res.ok && res.body) {
              this.countCartProductFromRemote();
            }
          }, error => {
            alert('My Error ' + error);
          });
      }
      else {
        this.productService.addToCartItemOnLocalStorage(this.productItem);
        this.itemOnCartExist = true;
      }
    }
  }

  removeFromCart() {
    if (this.productItem) {
      this.productService.removeItemFromLocalStorage(this.productItem);
      this.itemOnCartExist = false;
    }
  }

  initialiZation() {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.productService.productDetail(this.productId).pipe(take(1))
      .subscribe(result => {
        if (result.ok && result.body) {
          this.productItem = result.body;
        }
      }, error => {
        alert('My Error ' + error);
      })
    this.countCartProductFromLocal();
    this.countCartPdFromRemote();
  }

  countCartProductFromLocal() {
    const itemOnLocalCart = this.productService.productOnLocalCart(this.productId);
    if (itemOnLocalCart) {
      this.itemOnCartExist = itemOnLocalCart.length > 0 ? true : false;
    }
  }

  countCartPdFromRemote() {
    if (localStorage.getItem('user')) {
      let userData = JSON.parse(localStorage.getItem('user'))[0];
      this.userid = userData.id;
      this.productService.pdOnRemoteCartBasedOnUDPD(this.productId, userData.id).pipe(take(1))
        .subscribe(res => {
          if (res.ok && res.body) {
            this.itemOnCartExist = res.body.length > 0 ? true : false;
          }
        }, error => {
          alert('My Error ' + error);
        });
    }
  }

  countCartProductFromRemote() {
    if (localStorage.getItem('user')) {
      this.countCartPdFromRemote();
      let userData = JSON.parse(localStorage.getItem('user'))[0];
      this.userid = userData.id;
      this.productService.productOnRemoteCartBasedOnUserID(this.userid).pipe(take(1))
        .subscribe(res => {
          if (res.ok && res.body) {
            this.productService.itemOnRemoteCart.next(res.body);
          }
        }, error => {
          alert('My Error ' + error);
        });
    }
  }

}
