import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { baseUrl } from '../services/config.service';
let DocumentService = class DocumentService {
    constructor(http) {
        this.http = http;
    }
    getDocument(input) {
        return this.http.post(baseUrl + 'query/cb/date', input).pipe(map(response => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    getDocumentById(id) {
        return this.http.get(baseUrl + 'query/cb/id/' + id).pipe(map(response => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    updateDocument(input) {
        return this.http.post(baseUrl + 'upsert/cb/', input).pipe(map(response => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    pushErrToKafka(input) {
        return this.http.post(baseUrl + 'push/kafka/cb', input).pipe(map(response => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    queryLifeAsia(input) {
        return this.http.post(baseUrl + 'query/la', input).pipe(map(response => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    pushLaToKafka(input) {
        return this.http.post(baseUrl + 'push/kafka/la', [
            {
                "data": input
            }
        ]).pipe(map(response => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
};
DocumentService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DocumentService);
export { DocumentService };
//# sourceMappingURL=document.service.js.map