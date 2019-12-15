import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { HttpUtilityService } from 'src/app/shared/services/utility.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpCategoryService } from 'src/app/shared/services/categories.services';
import { DatePipe } from '@angular/common';
import { fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  cities: any = [];
  city: any;
  occasions: any[];
  subCategory: any[] = [];
  subCategoryId: any;
  occasion: string;
  rate_to: number;
  rate_from: number;
  query: any = {
    date: '',
    price_from: '',
    priceTo: '',
    sub_category: '',
  };
  // date: string;
  minDate: Date;
  date = new Date()
  rate = [
    {
      number: 1
    },
    {
      number: 2
    },
    {
      number: 3
    },
    {
      number: 4
    },
    {
      number: 5
    },
  ]
  categories: any;
  price_from: any;
  categoryId: any;
  price_to: any;
  capacity_from: any;
  capacity_to: any;
  hideSubCategory: boolean;
  property_name: string;

  @ViewChild('searchPropertyName', { static: true }) searchPropertyInput: ElementRef;
  @ViewChild('priceFromInput', { static: true }) searchByPriceFrom: ElementRef;
  @ViewChild('priceToInput', { static: true }) searchByPriceTo: ElementRef;
  @ViewChild('searchByCapcityFromInput', { static: true }) searchCapcityFromInput: ElementRef;
  @ViewChild('searchByCapcityToInput', { static: true }) searchCapcityToInput: ElementRef;

  constructor(
    private utilityService: HttpUtilityService,
    private activateRoute: ActivatedRoute,
    private httpCategoryService: HttpCategoryService,
    private datepipe: DatePipe,
    private router: Router
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());

  }

  ngOnInit() {
    this.fetchCities();
    this.fetchOccasions();
    this.fetchCategories();
    this.activateRoute.queryParamMap
      .subscribe(params => {
        let replaceDashDate = new Date()
        this.query = params['params'];
        this.city = params.get('city');
        this.occasion = params.get('occasion');
        this.categoryId = params.get('category');
        this.property_name = params.get('name');
        this.price_from = params.get('price_from');
        this.price_to = params.get('price_to');
        this.occasion = params.get('occasion');
        this.capacity_to = params.get('capacity_to');
        this.capacity_from = params.get('capacity_from');
        this.rate_to = +params.get('rate_to');
        this.rate_from = +params.get('rate_from');
        if (params.get('date')) {
          replaceDashDate = new Date(params.get('date').replace(/-/g, '/'));
        }
        this.date = replaceDashDate;
      });
    this.getSubCategories(this.categoryId);
    this.subCategoryId = this.query.sub_category;
  }

  fetchCities() {
    this.utilityService.getAllCities().subscribe(data => {
      this.cities = data.body;
      this.cities.unshift({ id: '', name: 'All' });
    });
  }

  fetchCategories() {
    this.httpCategoryService.getCategoriesFromApi()
      .subscribe(data => {
        this.categories = data.body;
        this.categories.unshift({ id: '', name: 'All' });
        if (this.subCategory.length > 0) {
          this.hideSubCategory = true;
        }
      })
  }

  fetchOccasions() {
    this.utilityService.getAllOccasions().subscribe(data => {
      this.occasions = data.body;
    });
  }
  selectCity(city) {
    let clone = Object.assign({}, this.query);
    clone.city = this.city;
    this.query = clone;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

  searchByPropertyName() {
    console.log('property name is', this.property_name);
    let clone = Object.assign({}, this.query);
    clone.name = this.property_name;
    this.query = clone;
    if (!this.property_name) {
      delete clone.property_name;
    }
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

  selectCategory(category) {
    this.subCategoryId = '';
    let clone = Object.assign({}, this.query);
    clone.category = category._id;
    this.query = clone;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
    this.httpCategoryService.getSubCategoryFromApi(category._id)
      .subscribe((data: any) => {
        this.subCategory = data.body;
        if (this.subCategory.length > 0) {
          this.hideSubCategory = true;
        } else {
          this.hideSubCategory = false;
        }
      });
  }

  selectEvent(selectetQuery, queryName) {
    let clone = Object.assign({}, this.query);
    clone[`${queryName}`] = selectetQuery._id;
    this.query = clone;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

  selectOccasion() {
    let clone = Object.assign({}, this.query);
    clone.occasion = this.occasion;
    this.query = clone;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

  selectSubCategory(category) {
    let clone = Object.assign({}, this.query);
    clone.sub_category = category._id;
    this.query = clone;
    this.getSubCategories(category._id);
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

  selectRateTo(event) {
    let clone = Object.assign({}, this.query);
    clone.rate_to = this.rate_to;
    this.query = clone;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }
  selectRateFrom(event) {
    let clone = Object.assign({}, this.query);
    clone.rate_from = this.rate_from;
    this.query = clone;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

  getSubCategories(categoryId) {
    if (categoryId) {
      this.httpCategoryService.getSubCategoryFromApi(categoryId)
        .subscribe((data: any) => {
          this.subCategory = data.body;
          if (this.subCategory.length < 1) {
            console.log('entered firsst')
            let clone = Object.assign({}, this.query);
            clone.sub_category = '';
            this.query = clone;
            this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
              relativeTo: this.activateRoute,
              queryParams: clone
            });
          } else {
            console.log('entered second')
          }
        });
    }
  }
  getPriceFrom() {
    let clone = Object.assign({}, this.query);
    clone.price_from = this.price_from;
    this.query = clone;
    if (!this.price_from) {
      delete clone.price_from;
    }
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }
  getPriceTo() {
    let clone = Object.assign({}, this.query);
    clone.price_to = this.price_to;
    this.query = clone;
    if (!this.price_to) {
      delete clone.price_to;
    }
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }
  // Capacity From //
  getCapacityFrom() {
    let clone = Object.assign({}, this.query);
    clone.capacity_from = this.capacity_from;
    this.query = clone;
    if (!this.capacity_from) {
      delete clone.capacity_from;
    }
    console.log(clone);
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }
  // Capacity To //
  getCapacityTo() {
    let clone = Object.assign({}, this.query);
    clone.capacity_to = this.capacity_to;
    this.query = clone;
    if (!this.capacity_to) {
      delete clone.capacity_to;
    }
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }


  getDate(event) {
    let clone = Object.assign({}, this.query);
    clone.date = this.formatDate(event);
    this.query = clone;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

  formatDate(selectedDate) {
    const currentDate = selectedDate;
    let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
    return latest_date || '';
  }


  ngAfterViewInit() {
    fromEvent(this.searchPropertyInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(750),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.searchByPropertyName();
    });

    fromEvent(this.searchByPriceFrom.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(750),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.getPriceFrom();
    });

    fromEvent(this.searchByPriceTo.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(750),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.getPriceTo();
    })


    fromEvent(this.searchCapcityFromInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(750),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.getCapacityFrom();
    })

    
    fromEvent(this.searchCapcityToInput.nativeElement, 'keyup').pipe(
      map((event: any) => {
        return event.target.value
      }),
      debounceTime(750),
      distinctUntilChanged(),
    ).subscribe(() => {
      this.getCapacityTo();
    })

  }

  resetForm() {
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: {}
    });
  }

}
