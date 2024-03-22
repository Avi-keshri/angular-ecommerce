import { Component } from '@angular/core';
import { Product } from '../../data-type';
import { SellerService } from '../../services/seller.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent {

  showMessage: string = '';

  constructor(private sellerService: SellerService, private router: Router) { }

  addProducts(sellerAddProduct: Product) {
    this.sellerService.addSellerProduct(sellerAddProduct).pipe(take(1))
      .subscribe(result => {
        if (result.ok) {
          this.showMessage = 'Product Added SuccessFully!';
          setTimeout(() => {
            this.showMessage = '';
            this.router.navigate(['seller/dashboard']);
          }, 3000)
        }
      }, error => {
        alert("My Error: " + error);
        this.showMessage = error.message;
      });
  }

}
