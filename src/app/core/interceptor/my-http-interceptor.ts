import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../modules/auth/service/auth.service';

@Injectable({
    providedIn: 'root'
})
export class MyHttpInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
        private router: Router,
    ) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let ignore =
            typeof request.body === "undefined"
            || request.body === null
            || request.body.toString() === "[object FormData]" // <-- This solves your problem
            || request.headers.has("content_language");
        // if (!window.navigator.onLine) {
        //     this.notifcationService.errorNotification('Please Check Your Internet Connection !!');
        //     return;
        // }
        if (ignore) {
            request = request.clone({
                setHeaders: {
                    'content_language': localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE"),
                    Authorization: `${this.authService.getToken()}`
                }
            });
            return next.handle(request);
        }

        request = request.clone({
            setHeaders: {
                'Content-Type': 'application/json',
                'Content-Language': localStorage.getItem("LOCALIZE_DEFAULT_LANGUAGE"),
                Authorization: `${this.authService.getToken()}`
            }
        });

        return next.handle(request).pipe(
            // catchError(x => this.handleAuthError(x))
        ); //here use an arrow function, otherwise you may get "Cannot read property 'navigate' of undefined" on angular 4.4.2/net core 2/webpack 2.70
    }

    private handleAuthError(err: HttpErrorResponse): Observable<any> {
        return throwError(err);
    }
}
