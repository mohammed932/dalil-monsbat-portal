import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loading: boolean = false;
  userData = {};
  svgWidth: number;

  constructor(
    private fg: FormBuilder,
    private authService: AuthService,
    private router: Router,
    public breakpointObserver: BreakpointObserver,
    private toaster: ToastrService
  ) { }

  public loginForm = this.fg.group({
    mobile: ["", Validators.required],
  });

  ngOnInit() {
    this.breakpointObserver
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.svgWidth = 90;
        } else {
          this.svgWidth = 50;
        }
      });
  }
  requiredErrorMessage($feild) {
    return this.loginForm.controls[$feild].hasError("required")
      ? "You must enter a value"
      : "";
  }


  login() {
    const mobile = '+966' + this.loginForm.controls.mobile.value.toString().replace(/^0+/, '');
    let userCredentials = {
      mobile: mobile,
      type: "customer"
    };

    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(userCredentials).subscribe(
        (resp: HttpResponse<any>) => {
          console.log(resp)
          if (resp.status === 200) {
            this.authService.saveUserPhoneNumber(mobile);
            this.authService.saveUserId(resp.body.id);
            localStorage.setItem("mobile_token", resp.body.mobile_token);
            
            this.router.navigate([`${localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE")}/auth/verify-code`]);
          }
        },
        err => {
          this.loading = false;
          this.toaster.error(err.error.message);
          // this.notifcationService.errorNotification(err.error.message);
        }
      );
    }
  }

  setUserDataToLocalStorage(userData) {
    localStorage.setItem("user", JSON.stringify(userData["id"]));
  }

}
