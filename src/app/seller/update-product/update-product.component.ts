import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../data-type';
import { SellerService } from '../../services/seller.service';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  showMessage: string = '';
  productId: number;
  sellerproducts: Product;

  @ViewChild('sellerUpdateProduct', { static: false }) sellerUpdateProduct: NgForm;

  constructor(private sellerService: SellerService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = +this.route.snapshot.paramMap.get('id');
    this.sellerService.showSellerProduct(this.productId).pipe(take(1))
      .subscribe(result => {
        if (result.ok && result) {
          this.sellerproducts = {
            name: result.body?.name,
            category: result.body?.category,
            color: result.body?.color,
            price: result.body?.price,
            description: result.body?.description,
            image: result.body?.image,
          };
          this.sellerUpdateProduct.setValue(this.sellerproducts);

        }
      }, error => {
        alert("My Error: " + error);
        this.showMessage = error.message;
      });
  }

  updateProducts(sellerUpdateProduct: Product) {
    this.sellerService.updateSellerProduct(sellerUpdateProduct, this.productId).pipe(take(1))
      .subscribe(result => {
        if (result.ok) {
          this.showMessage = 'Product Updated SuccessFully!';
          setTimeout(() => {
            this.showMessage = '';
            this.router.navigate(['seller/dashboard']);
          }, 3000)
        }
      }, error => {
        alert("My Error: " + error);
        console.log(error);
        this.showMessage = error.message;
      });
  }

}
