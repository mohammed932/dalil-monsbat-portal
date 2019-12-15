import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class HttpUtilityService {
    private baseUrl = environment.baseUrl;
    private filterSubject = new BehaviorSubject<{}>({});
    constructor(
        private _httpClient: HttpClient
    ) {
    }

    getAllCities() {
        return this._httpClient.get<any[]>(`${this.baseUrl}cities`, {
            observe: 'response'
        })
    }

    getAllOccasions() {
        return this._httpClient.get<any[]>(`${this.baseUrl}occasions`, {
            observe: 'response'
        })
    }

    getFilterSubject() {
        return this.filterSubject.asObservable();
    }

    getAboutUs() {
        return this._httpClient.get(`${this.baseUrl}configuration`, {
            observe: 'response'
        })
    }


    setFilterData(query) {
        this.filterSubject.next(query);
    }




}