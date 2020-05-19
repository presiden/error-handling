import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EditComponent } from './edit/edit.component';
import { AddComponent } from './add/add.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '',  component: LoginComponent},
  // { path: 'edit/:datarow',  component: EditComponent},
  { path: 'add',  component: AddComponent},
  { path: 'edit',  component: EditComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
