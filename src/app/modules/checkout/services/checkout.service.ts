import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: "root"
})
export class HttpCheckoutService {
    baseUrl = environment.baseUrl;
    constructor(
        private httpClient: HttpClient
    ) { }


    payNowApi(payment_type) {
        const reservationDate = localStorage.getItem('reservationDate');
        const body = {
            date: reservationDate,
            payment_type: payment_type,
        }
        const property = JSON.parse(localStorage.getItem('property'));
        return this.httpClient.post(`${this.baseUrl}properties/${property._id}/users/${localStorage.getItem('userId')}/bookings`, body, {
            observe: 'response'
        })
    }




}