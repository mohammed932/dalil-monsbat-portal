import { Component, OnInit } from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { HttpPropertyService } from '../../services/properties.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, finalize, delay, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { cardAnimation } from '../../animations/animation';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    cardAnimation
  ]
})
export class ItemComponent implements OnInit {
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
    loop: true,
    RTL: true,
    slide: 1,
    speed: 300,
    point: {
      visible: true
    },
    // interval: { timing: 1500 },
    velocity: 0,
    touch: true,
    easing: 'cubic-bezier(0, 0, 0.2, 1)'
  };
  config: any;
  noActivity = false;
  items: any[] = [];
  query = {};
  loading: boolean;
  isAvailable = true;
  date: string;
  constructor(
    private httpPropertyService: HttpPropertyService,
    private route: ActivatedRoute, private router: Router,
    private datepipe: DatePipe
  ) { }

  ngOnInit() {
    this.config = {
      currentPage: 1,
      itemsPerPage: 10
    };
    this.route.queryParamMap
      .subscribe(page => {
        console.log(page);
        this.config.currentPage = page['params'].page || 1;
        this.query['page'] = page['params'].page || 1;
        this.query['category'] = page['params'].category || '';
        this.query['sub_category'] = page['params'].sub_category || '';
        this.query['occasion'] = page['params'].occasion;
        this.query['city'] = page['params'].city;
        this.query['date'] = page['params'].date;
        this.query['price_from'] = page['params'].price_from;
        this.query['name'] = page['params'].name;
        this.query['price_to'] = page['params'].price_to;
        this.query['rate_to'] = page['params'].rate_to;
        this.query['rate_from'] = page['params'].rate_from;
        this.query['capacity_from'] = page['params'].capacity_from;
        this.query['capacity_to'] = page['params'].capacity_to;
        this.query['sort'] = page['params'].sort;
        this.date = this.query['date'];
        let replaceDashDate = new Date()
        if (this.query['date']) {
          replaceDashDate = new Date(page.get('date'));
        }
        this.date = this.formatDate(replaceDashDate);
        if (page['params'].category !== 'offers') {
          this.loadData(this.query);
        }
        if (page['params'].category === 'offers') {
          this.query['category'] = '';
          this.loadOffers(this.query);
        }
      });
  }


  pageChange(newPage: number) {
    this.query['page'] = newPage;
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], { queryParams: this.query });
  }

  formatDate(selectedDate) {
    const currentDate = selectedDate;
    let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
    return latest_date || '';
  }


  loadData(queryPrams) {
    this.loading = true;
    console.log(queryPrams)
    this.httpPropertyService.getPropertiesFromApi(queryPrams).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      finalize(() => this.loading = false)
    )
      .subscribe((data: any) => {
        this.items = data.body;
        if (typeof data.body == 'undefined' && data.body.length < 1) {
          this.noActivity = true;
        }
      })
  }

  loadOffers(queryParams) {
    this.httpPropertyService.getOffersFromApi(queryParams).pipe(
      debounceTime(500),
      distinctUntilChanged(),
      finalize(() => this.loading = false)
    )
      .subscribe(data => {
        this.items = data.body;
        if (this.items.length === 0 || this.items.length === undefined) {
          this.noActivity = true;
        }
      })
  }

  checkPropertyAvaiable(property) {
    console.log(property)
    let isAvailable = true;
    if (property.is_offer && !property.is_offer_available) {
      isAvailable = false;
    } else if (!property.is_offer && !property.is_available) {
      isAvailable = false;
    }
    return isAvailable;
  }
}
