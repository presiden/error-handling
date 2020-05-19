import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import { Login } from "../models/login.model";
import { throwError, config } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { DocFilter } from '../models/document-filter.model';
import { Doc } from "../models/document.model";
import { AppComponent } from '../app.component';
import { baseUrl } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class LoginService {
  
  constructor(private http: HttpClient) { }

  public login(user: Login) {
    return this.http.post(baseUrl + 'auth', user).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
