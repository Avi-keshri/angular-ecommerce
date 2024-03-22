import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, take } from 'rxjs';
import { signUp, login } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  userSignUp(data: signUp) {
    this.http.post('http://localhost:3000/user', data, { observe: 'response' }).pipe(take(1))
      .subscribe(result => {
        if (result.ok) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['']);
        }
        console.log(result);
      }, error => {
        alert("My Error: " + error);
      });
  }

  reloadUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.router.navigate(['']);
    }
  }

  userLogin(data: login) {
    this.http.get<login>(`http://localhost:3000/user?email=${data.email}&password=${data.password}`, { observe: 'response' }).pipe(take(1))
      .subscribe(result => {
        console.log(result);
        if (result.ok && result.body) {
          localStorage.setItem('user', JSON.stringify(result.body));
          this.router.navigate(['']);
        }
      }, error => {
        alert("My Error: " + error);
      });
  }
}
