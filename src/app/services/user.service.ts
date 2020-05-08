import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from "@angular/common/http";
import { User } from "../models/user.model";
import { throwError } from 'rxjs';
import { map, retry, catchError } from 'rxjs/operators';
import { DocFilter } from '../models/document-filter.model';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class UserService {
  baseUrl: String = 'http://localhost:8081/';
  // baseUrl: String = 'http://10.171.212.102:8811/resubmission/';

  constructor(private http: HttpClient) { }

  // public getUser() {
  //   return this.http.get(this.baseUrl + 'getUser').pipe(
  //     map((res: Response) => {
  //       console.log("::");
  //       console.log(res);
  //       return res;
  //     }),
  //     catchError(error => {
  //       return throwError(error);
  //     })
  //   )
  // }

  public login(user: User) {
    return this.http.get(this.baseUrl + 'auth').pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public getDocument(input: String) {
    return this.http.post(this.baseUrl + 'query/cb/date', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public getUser() {
    return this.http.get(this.baseUrl + 'getUser').pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public postUser(user: User) {
    return this.http.post(this.baseUrl + 'postUser', user).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  // public getUser(): Observable<User> {
  //   return this.http.get<User>('http://localhost:8081/getUser')
  //     .pipe(
  //       retry(1)
  //     );
  // }

  //   return this.http.get('http://localhost:8081/getUser');
  //   // return this.http.get<User[]>('http://localhost:8081/getUser');
  // }
}
