import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class HttpQuestionsService {
    baseUrl = environment.baseUrl;
    constructor(
        private httpClient: HttpClient
    ) { }

    getQuestions() {
        return this.httpClient.get(`${this.baseUrl}questions`, {
            observe: 'response'
        })
    }




}