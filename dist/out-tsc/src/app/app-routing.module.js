import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
const routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: LoginComponent }
];
let AppRoutingModule = class AppRoutingModule {
};
AppRoutingModule = __decorate([
    NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map