import { Component, OnInit } from '@angular/core';
import { HttpCategoryService } from 'src/app/shared/services/categories.services';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/modals/category.modal';
import { take, finalize } from 'rxjs/operators';
import { cardAnimation } from 'src/app/shared/animations/animation';
@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class ListCategoriesComponent implements OnInit {
  loading = true;
  categories$: any = [];
  constructor(
    private httpCategoryService: HttpCategoryService
  ) { }

  ngOnInit() {
    this.httpCategoryService.getCategoriesFromApi().pipe(
      finalize(() => this.loading = false)
    ).subscribe(data => {
      this.categories$ = data.body;
      const name = 
      localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE') === 'en' ? 'Special Offers' : 'العروض الخاصه';
      this.categories$.push(
        {
          image: 'https://www.offers.com/images/offers-logo-fb.png',
          name: name,
          _id: 'offers'
        })
    })
  }



}
