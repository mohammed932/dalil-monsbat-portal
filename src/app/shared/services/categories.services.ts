import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { Category } from '../modals/category.modal';


@Injectable({
    providedIn: 'root'
})
export class HttpCategoryService {
    private baseUrl = environment.baseUrl;
    private categoriesSubject = new BehaviorSubject<[]>([]);
    private subCategoriesSubject = new BehaviorSubject<[]>([]);

    constructor(
        private _httpClient: HttpClient
    ) {
        this.getCategoriesFromApi();
    }

    getCategoriesFromApi() {
        return this._httpClient.get<Category[]>(`${this.baseUrl}categories`, {
            observe: 'response'
        })
    }

    getSubCategoryFromApi(categoryId) {
        return this._httpClient.get(`${this.baseUrl}categories/${categoryId}/subCategories`, {
            observe: 'response'
        });
    }

 
    private setCategoriesSubject(categories) {
        this.categoriesSubject.next(categories);
    }
    getCategoriesDataSource() {
        return this.categoriesSubject.asObservable();
    }

}