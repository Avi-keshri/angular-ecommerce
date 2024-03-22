import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../data-type';
import { SellerService } from '../../services/seller.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  productsList: Product[];
  constructor(private sellerService: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.listProducts();
  }

  onDeleteItem(id: number) {
    const deleteItem = confirm('Are you sure you want to delete this item?');
    if (deleteItem) {
      this.sellerService.deleteItem(id).pipe(take(1))
        .subscribe(result => {
          if (result.ok) {
            this.listProducts();
          }
        }, error => {
          alert('My Error ' + error.message);
        })
    }

  }

  listProducts() {
    this.sellerService.getProducts().pipe(take(1))
      .subscribe(result => {
        if (result.ok) {
          this.productsList = result.body;
        }
      }, error => {
        alert('My Error ' + error.message);
      })
  }
}
