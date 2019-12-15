import { Component, OnInit } from "@angular/core";
import { HttpResponse } from '@angular/common/http';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: "app-verify-login",
  templateUrl: "./verify.login.component.html",
  styleUrls: ["./verify.login.component.scss", '../login/login.component.scss']
})
export class VerifyLoginComponent implements OnInit {
  counter = 30;
  interval = 1000;
  loading: boolean = false;
  loadingResend: boolean = false;
  userData = {};
  value;
  constructor(
    private fg: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  public verifyCodeForm = this.fg.group({
    mobile: ["", Validators.required]
  });

  ngOnInit() {
    this.verifyCodeForm.controls.mobile.setValue(
      localStorage.getItem("mobile_token")
    );
  }

  requiredErrorMessage($feild) {
    return this.verifyCodeForm.controls[$feild].hasError("required")
      ? "You must enter a value"
      : "";
  }

  resendCode() {
    const userMobileNumber = this.authService.getUserPhoneNumber();
    let userCredentials = {
      mobile: userMobileNumber,
      type: "admin"
    };

    if (!this.loadingResend) {
      this.loadingResend = true;
      this.authService.login(userCredentials).subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.status === 200) {
            this.verifyCodeForm.controls.mobile.setValue(
              resp.body.mobile_token
            );
            this.authService.saveUserId(resp.body.id);
            localStorage.setItem("mobile_token", resp.body.mobile_token);
            this.loadingResend = false;
          }
        },
        err => {
          this.loadingResend = false;
        }
      );
    }
  }

  verifyCode() {
    const data = {
      mobile_token: localStorage.getItem("mobile_token"),
      userId: localStorage.getItem("userId")
    };
    this.isValidCode(data);
  }

  isValidCode(data) {
    const userData = {
      user: data.userId,
      mobile_token: parseInt(data.mobile_token)
    };
    this.authService.varifyCode(userData).subscribe(
      resp => {
        if (resp.status === 200) {
          this.counter = 30;
          this.authService.saveToken(resp.body.token);
          this.authService.saveUserData(resp.body);
          localStorage.setItem("isLogin", "true");
          this.authService.isLogoutSubject.next(true);
          const checkout = localStorage.getItem('checkout');
          if (checkout === 'true') {
            this.router.navigateByUrl(`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/checkout`);
            return;
          }
          this.router.navigate(["/"]);
        }
      },
      err => {
        this.toastr.error(err.error.message);
      }
    );
  }
}
