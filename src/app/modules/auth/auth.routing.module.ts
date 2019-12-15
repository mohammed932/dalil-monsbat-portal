import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { VerifyLoginComponent } from './verify.login/verify.login.component';

export const AuthRoutes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: "full"
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'verify-code',
    component: VerifyLoginComponent
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(AuthRoutes),
  ],
  exports: [RouterModule]
})
export class AuthRoutingModule { }