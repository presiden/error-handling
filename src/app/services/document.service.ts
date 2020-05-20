import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { Doc } from "../models/document.model";
import { DocFilter } from "../models/document-filter.model";
import { QueryLa } from '../models/query.model';
import { LifeAsiaDocument } from '../models/lifeasia-document.model';
import { baseUrl } from '../services/config.service';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  constructor(private http: HttpClient) { }

  public getDocument(input: DocFilter) {
    return this.http.post(baseUrl + 'query/cb/date', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public getDocumentById(id: any) {
    return this.http.get(baseUrl + 'query/cb/id/' + id).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public updateDocument(input: Doc) {
    return this.http.post(baseUrl + 'upsert/cb/', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public pushErrToKafka(input: any) {
    return this.http.post(baseUrl + 'push/kafka/cb', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public queryLifeAsia(input: any) {
    return this.http.post(baseUrl + 'query/la', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }

  public pushLaToKafka(input: any) {
    return this.http.post(baseUrl + 'push/kafka/la', input).pipe(
      map(response => {
        return response;
      }),
      catchError(error => {
        return throwError(error);
      })
    )
  }
}
