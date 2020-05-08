import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";
import { QueryLa } from '../models/query.model';
import { LifeAsiaDocument } from '../models/lifeasia-document.model';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {
  baseUrl: String = 'http://localhost:8081/';
  // baseUrl: String = 'http://10.171.212.102:8811/resubmission/';
  
  constructor(private http: HttpClient) { }

  public getDocument(input: DocFilter) {
    return this.http.post(this.baseUrl + 'query/cb/date', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public getDocumentById(id: any) {
    return this.http.get(this.baseUrl + 'query/cb/id/' + id).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public updateDocument(input: Doc) {
    return this.http.post(this.baseUrl + 'upsert/cb/', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public pushErrToKafka(input: DocFilter) {
    return this.http.post(this.baseUrl + 'push/kafka/cb', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public queryLifeAsia(input: QueryLa) {
    return this.http.post(this.baseUrl + 'query/la', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public pushLaToKafka(input: LifeAsiaDocument) {
    return this.http.post(this.baseUrl + 'push/kafka/la', [
      {
        "data": input
      }
    ]).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
