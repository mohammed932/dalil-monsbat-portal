import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseUrl = environment.baseUrl;
  userData = JSON.parse(localStorage.getItem('userData'));
  constructor(
    private httpClient: HttpClient
  ) { }


  getAllUsers($sName = '', $sCar = '', $sMobile = '') {
    let params = new HttpParams();
    params = params.append('fullName', $sName);
    params = params.append('carNumbers', $sCar);
    params = params.append('mobile', $sMobile);
    return this.httpClient.get(`${this.baseUrl}getAllUsers`, {
      params: params,
      observe: 'response'
    })
  }

  getSingleUser() {
    return this.httpClient.get(`${this.baseUrl}${this.userData._id}`, {
      observe: 'response'
    })
  }

  updateUser(body) {
    return this.httpClient.put(`${this.baseUrl}${this.userData._id}`, body, {
      observe: 'response'
    })
  }
}
