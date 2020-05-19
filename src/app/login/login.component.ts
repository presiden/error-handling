import { Component, OnInit, NgModule, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Login } from "../models/login.model";
import { FormBuilder } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  user: Login;

  constructor(private http: HttpClient, private loginService: LoginService) {
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
      } else {
        console.log("login failed");
      }

    });
  }
}
