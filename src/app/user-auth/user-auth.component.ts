import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { signUp, login } from '../data-type';
import { SellerService } from '../services/seller.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrl: './user-auth.component.css'
})
export class UserAuthComponent implements OnInit {
  toggleAuth: boolean = false;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.reloadUser();
  }

  signUp(userSignUp: signUp) {
    this.userService.userSignUp(userSignUp);
  }

  login(userLogin: login) {
    this.userService.userLogin(userLogin);
  }
}
