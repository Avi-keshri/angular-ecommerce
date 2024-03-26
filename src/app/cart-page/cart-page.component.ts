import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Cart, CartSummary } from '../data-type';
import { take } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css'
})
export class CartPageComponent implements OnInit {
  cartList: Cart[];
  cartSummary: CartSummary = {
    subtotal: 0,
    discount: 0,
    delivery: 0,
    tax: 0,
    total: 0
  };
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.initialiZation();
  }

  initialiZation() {
    if (localStorage.getItem('user')) {
      let userDetail = JSON.parse(localStorage.getItem('user'))[0];
      this.productService.getCartPageBasedOnUD(userDetail.id).pipe(take(1))
        .subscribe(res => {
          if (res.ok && res.body) {
            this.cartList = res.body;
            res.body.forEach(element => {
              if (this.cartSummary) {
                this.cartSummary.subtotal = this.cartSummary.subtotal + ((+element.price) * element.quantity);
                this.cartSummary.discount = +(element.price) / 100;
                this.cartSummary.delivery = +(element.price) / 1000;
                this.cartSummary.tax = (+element.price) / 10;
                this.cartSummary.total = (this.cartSummary.subtotal) - (+(element.price) / 100) + (+(element.price) / 1000) + ((+element.price) / 10);
              }
            })
          }
        }, error => {
          alert('My Error ' + error);
        })
    }
  }

  removeFromCart(id: number) {
    const deleteItem = confirm('Are you sure you want to delete this item?');
    if (deleteItem) {
      this.productService.removeProductFromCart(id).pipe(take(1))
        .subscribe(res => {
          if (res.ok && res.body) {
            this.initialiZation();
          }
        }, error => {
          alert('My Error ' + error);
        })
    }
  }

}
