import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
let UserService = class UserService {
    constructor(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8081/';
    }
    getUser() {
        return this.http.get(this.baseUrl + 'getUser').pipe(map(response => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
    postUser(input) {
        return this.http.post(this.baseUrl + 'postUser', input).pipe(map((response) => {
            return response;
        }), catchError(error => {
            return throwError(error);
        }));
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map