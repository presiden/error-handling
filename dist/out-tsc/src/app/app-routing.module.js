import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';
const routes = [
    { path: 'home', component: HomeComponent },
    { path: '', component: LoginComponent },
    // { path: 'edit/:datarow',  component: EditComponent},
    { path: 'add', component: AddComponent },
    { path: 'edit', component: EditComponent },
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