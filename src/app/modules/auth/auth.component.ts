import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from './service/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  loading: boolean = false;
  userData = {};

  constructor(
    private fg: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) { }

  public loginForm = this.fg.group({
    mobile: ["", Validators.required]
  });

  ngOnInit() { }

  requiredErrorMessage($feild) {
    return this.loginForm.controls[$feild].hasError("required")
      ? "You must enter a value"
      : "";
  }

  login() {
    const mobileNumber = this.loginForm.controls.mobile.value.toString();
    let userCredentials = {
      mobile: mobileNumber,
      type: "admin"
    };
    if (mobileNumber.charAt(0) !== '+') {
      // this.notifcationService.errorNotification('Please enter (+) before the phone number');
      // return;
    }
    if (this.loginForm.invalid) {
      // this.notifcationService.errorNotification(
      //   "Please Enter Valid Phone Number"
      // );
      return;
    }
    if (this.loginForm.valid && !this.loading) {
      this.loading = true;
      this.authService.login(userCredentials).subscribe(
        (resp: HttpResponse<any>) => {
          if (resp.status === 200) {
            this.authService.saveUserPhoneNumber(mobileNumber);
            //save user id
            this.authService.saveUserId(resp.body.id);
            //just for development
            localStorage.setItem("mobile_token", resp.body.mobile_token);
            // this.authService.isLoggedIn();
            this.router.navigateByUrl(
              `${localStorage.getItem(
                "LOCALIZE_DEFAULT_LANGUAGE"
              )}/auth/verify-user`
            );
          }
        },
        err => {
          this.loading = false;
          // this.notifcationService.errorNotification(err.error.message);
        }
      );
    }
  }

  setUserDataToLocalStorage(userData) {
    localStorage.setItem("user", JSON.stringify(userData["id"]));
  }

}
