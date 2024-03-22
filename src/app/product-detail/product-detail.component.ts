import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  productId: number;
  productItem: Product;
  productQuantity: number = 1;
  itemOnCartExist: boolean = false;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initialiZation();
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
      this.productService.addToCartItem(this.productItem);
      this.itemOnCartExist = true;
    }
  }

  removeFromCart() {
    if (this.productItem) {
      this.productService.removeFromCartItem(this.productItem);
      this.itemOnCartExist = false;
    }
  }

  initialiZation() {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.productService.productDetail(this.productId).subscribe(result => {
      if (result.ok && result.body) {
        this.productItem = result.body;
      }
    }, error => {
      alert('My Error ' + error);
    })
    const itemOnCart = this.productService.productOnLocalCart(this.productId);
    this.itemOnCartExist = itemOnCart.length > 0 ? true : false;
    console.log(itemOnCart)
  }

}
