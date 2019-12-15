import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { state } from '@angular/animations';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private token: string;
  public tokenSubjectSource = new BehaviorSubject<string>('');
  public tokenSubjectData = this.tokenSubjectSource.asObservable();
  public isLogoutSubject = new BehaviorSubject<boolean>(true);
  public isLogoutState$ = this.isLogoutSubject.asObservable();

  public isUserOperationSource = new BehaviorSubject<boolean>(false);
  public isUserOperationState = this.isUserOperationSource.asObservable();
  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location
  ) { }

  public saveToken(token: string): void {
    localStorage.setItem("dmpToken", token);
    this.tokenSubjectSource.next(token);
    this.isLogoutSubject.next(false);
    this.token = token;
  }

  public getToken(): string {
    let existToken = localStorage.getItem("dmpToken");
    if (!this.token || !existToken) {
      this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI1ZDQ5YWI0MmRiNDFhNzYwNGVhZGQxYzEiLCJyb2xlcyI6WyJjdXN0b21lciJdLCJpYXQiOjE1NjUxMDkwNTh9.4fTAwCh5C7_nzNNjw1iaoUnCxq7Sw4tlPh074cxKfmo'
      localStorage.setItem('guestToken', this.token)
    } else {
      this.token = localStorage.getItem("dmpToken");
    }
    return this.token;
  }

  isToken() {
    return localStorage.getItem('dmpToken') || undefined;
  }

  logout() {
    localStorage.removeItem('mobile_token');
    localStorage.removeItem('userPhoneNumber');
    localStorage.removeItem('userId');
    localStorage.removeItem('dmpToken');
    localStorage.removeItem('userData');
    localStorage.setItem('isLogin', 'false');
    this.isLogoutSubject.next(false);
    // location.reload();
    return this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/auth/login`]);
  }


  public getUserIdWhenLoginIn(): string {
    return localStorage.getItem('userId');
  }

  public getUserPhoneNumber(): string {
    return localStorage.getItem('userPhoneNumber');
  }

  public saveUserId(userId) {
    localStorage.setItem('userId', userId);
  }

  public saveUserPhoneNumber(phoneNumber) {
    localStorage.setItem('userPhoneNumber', phoneNumber);
  }

  public saveUserData(data) {
    localStorage.setItem('userData', JSON.stringify(data));
  }

  public getUserRole() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    return userData['roles'][0];
  }


  // public logOut() {
  //   localStorage.removeItem('mobile_token');
  //   localStorage.removeItem('userPhoneNumber');
  //   localStorage.removeItem('userId');
  //   localStorage.removeItem('dmpToken');
  //   localStorage.removeItem('userData');
  //   localStorage.setItem('isLogin', 'false');
  //   this.isLogoutSubject.next(false);
  //   return this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/auth/login`]);
  // }



  public login($userCredentials): Observable<any> {
    return this.http.post(`${this.baseUrl}login`, $userCredentials, {
      observe: "response",
    });
  }

  public varifyCode($code): Observable<any> {
    return this.http.post(`${this.baseUrl}verify`, $code, {
      observe: "response",
    });
  }

  isLoggedIn() {
    return true;
  }

  // public requestResetCode($email): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/email`, $email, {
  //     observe: "response",
  //   });
  // }

  // public checkResetCode($code): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/code`, $code, {
  //     observe: "response"
  //   });
  // }

  // public resetPassword($newPassword): Observable<any> {
  //   return this.http.post(`${this.resetBaseUrl}/reset`, $newPassword, {
  //     observe: "response"
  //   });
  // }
}
