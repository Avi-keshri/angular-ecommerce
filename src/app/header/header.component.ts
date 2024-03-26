import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { take } from 'rxjs';
import { UserService } from '../services/user.service';
import { signUp } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';
  itemOnCart: number = 0;
  searchTerm: string = '';
  isUserLogin: boolean = false;
  userDetail: signUp;
  sellerName: string = '';
  userName: string = '';
  userid: number;

  constructor(private router: Router, private productSrv: ProductService, private userService: UserService) { }

  ngOnInit(): void {
    this.initialization();
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['']);
  }
  userLogout() {
    localStorage.removeItem('user');
    this.productSrv.itemOnRemoteCart.next([]);
    this.router.navigate(['user-auth']);
  }

  onSearch(searchItem: HTMLElement) {
    this.searchTerm = (searchItem as HTMLInputElement).value;
    this.productSrv.productList.next(this.searchTerm);
  }

  initialization() {
    this.router.events
      .subscribe((event: any) => {
        if (event instanceof NavigationEnd) {
          if (event.url != undefined) {
            if (localStorage.getItem('seller') && event.url.includes('seller')) {
              let sellerData = JSON.parse(localStorage.getItem('seller'))[0];
              this.sellerName = sellerData.name;
              this.menuType = 'seller';
            }
            else if (localStorage.getItem('user')) {
              let userData = JSON.parse(localStorage.getItem('user'))[0];
              this.userid = userData.id;
              this.userName = userData.name;
              this.countCartProductFromRemote();
              this.menuType = 'user';
            } else {
              this.menuType = 'default';
            }

          }
        }
      });
    this.countCartProduct();
  }

  countCartProductFromRemote() {
    this.productSrv.getRemoteCartProductBasedOnUserID(this.userid).pipe(take(1))
      .subscribe(res => {
        if (res.ok && res.body) {
          this.itemOnCart = res.body.length;
        }
      }, error => {
        alert('My Error ' + error);
      });
  }

  countCartProduct() {
    this.productSrv.showItemOnCart.pipe(take(1))
      .subscribe(result => {
        this.itemOnCart = result.length;
      })
    let cartItem = JSON.parse(localStorage.getItem('localCartItem'));
    if (cartItem) {
      this.itemOnCart = cartItem.length;
    }
    this.productSrv.itemOnRemoteCart.subscribe(result => {
      this.itemOnCart = result.length;
    })
  }
}
