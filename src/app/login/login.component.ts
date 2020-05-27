import { Component, OnInit, NgModule, ElementRef, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Login } from "../models/login.model";
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: Login;

  constructor(private http: HttpClient, private loginService: LoginService, private router: Router) {
    if(localStorage.getItem("isLoggedIn")){
      this.router.navigateByUrl("/home");  
      return;
    }
  }

  ngOnInit(): void {
  }

  login(username: any, password: any) {
    this.user = new Login();
    this.user.username = username;
    this.user.password = password;

    this.loginService.login(this.user).subscribe((res: any) => {
      this.user = res;
      console.log("login:");
      console.log(res);

      if (this.user.username != null) {
        console.log("login success");
        localStorage.setItem('isLoggedIn', "true");
        this.router.navigateByUrl("/home");
      } else {
        localStorage.setItem('isLoggedIn', "false");
        console.log("login failed");
      }

    });
  }
}
