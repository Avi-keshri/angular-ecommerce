import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  popularProductsList: Product[];
  trendingProductsList: Product[];
  searchText: string = '';

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsList();
    this.trendingProductList();
    this.productService.productList.subscribe(result => {
      this.searchText = result;
    })
  }

  productsList() {
    this.productService.popularProducts().subscribe(result => {
      if (result.ok) {
        this.popularProductsList = result.body;
      }
    })
  }
  trendingProductList() {
    this.productService.trendingproducts().subscribe(result => {
      this.trendingProductsList = result.body
    })
  }
}
