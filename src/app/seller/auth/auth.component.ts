import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../services/seller.service';
import { login, signUp } from '../../data-type';
import { Router } from '@angular/router';
import { take } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {

  toggleAuth: boolean = false;

  constructor(private seller: SellerService, private router: Router) { }

  ngOnInit(): void {
    this.seller.reloadSeller();
  }

  signUp(sellerSignUp: signUp) {
    this.seller.userSignUp(sellerSignUp);
  }

  login(sellerLogin: login) {
    this.seller.userLogin(sellerLogin);
  }

}
