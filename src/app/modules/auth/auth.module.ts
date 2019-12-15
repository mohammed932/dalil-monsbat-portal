import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
import { VerifyLoginComponent } from './verify.login/verify.login.component';
import { AuthRoutingModule } from './auth.routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, AuthRoutingModule],
  declarations: [AuthComponent, LoginComponent, VerifyLoginComponent,]
})
export class AuthModule { }
