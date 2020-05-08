import { Component, OnInit, NgModule, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from "../models/user.model";
import { UserService } from '../services/user.service';
import { FormBuilder } from '@angular/forms';
import { Doc } from '../models/document.model';
import { DocFilter } from '../models/document-filter.model';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  products: any = [];
  user: User;
  doc: Doc[];

  constructor(private http: HttpClient, private userService: UserService, private docService: DocumentService) {
    this.getUser();
  }

  ngOnInit(): void {
  }

  login(username: any, password: any) {
    this.user = new User();
    this.user.username = username;
    this.user.password = password;

    this.userService.login(this.user).subscribe((res: any) => {
      this.user = res.data;
      console.log("login:");
      console.log(res);

      if (this.user.username != null) {
        console.log("sukses");
        console.log(this.user);
      } else {
        console.log("gagal");
      }

    });
  }

  getUser() {
    this.user = new User();

    this.userService.getUser().subscribe((res: any) => {
      this.user = res.data;
      console.log("getUser:");
      console.log(res);
    });
  }

  postUser(username: any, password: any) {
    this.user = new User();
    this.user.username = username;
    this.user.password = password;

    this.userService.postUser(this.user).subscribe((res: any) => {
      this.user = res;
      console.log("postUser:");
      console.log(res);

      if (this.user.username != null) {
        console.log("sukses");
        console.log(this.user);
      } else {
        console.log("gagal");
      }

    });
  }

}
