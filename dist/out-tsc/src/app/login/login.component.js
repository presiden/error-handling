import { __decorate } from "tslib";
import { Component } from '@angular/core';
let LoginComponent = class LoginComponent {
    constructor(http, userService, fb) {
        this.http = http;
        this.userService = userService;
        this.fb = fb;
        this.products = [];
        this.getUser();
    }
    ngOnInit() {
    }
    getUser() {
        this.userService.getUser().subscribe((res) => {
            this.user = res.data;
            console.log("tes user");
            console.log(this.user);
            console.log(res);
        });
    }
    postUser(username, password) {
        this.user.username = username;
        this.user.password = password;
        console.log("postUser:");
        console.log(this.user);
        this.userService.postUser(this.user).subscribe((res) => {
            this.user = res.data;
            console.log("response:");
            console.log(res);
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