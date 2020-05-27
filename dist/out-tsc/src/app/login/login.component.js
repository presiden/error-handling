import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { Login } from "../models/login.model";
let LoginComponent = class LoginComponent {
    constructor(http, loginService) {
        this.http = http;
        this.loginService = loginService;
    }
    ngOnInit() {
    }
    login(username, password) {
        this.user = new Login();
        this.user.username = username;
        this.user.password = password;
        this.loginService.login(this.user).subscribe((res) => {
            this.user = res;
            console.log("login:");
            console.log(res);
            if (this.user.username != null) {
                console.log("login success");
            }
            else {
                console.log("login failed");
            }
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map