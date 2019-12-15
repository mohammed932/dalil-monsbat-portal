import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  step = '';
  arrangements = [
    {
      id: 1,
      title: 'high_price',
      value: 'max_price',
    },
    {
      id: 2,
      title: 'min_price',
      value: 'min_price',
      selected: false,
    },
    {
      id: 3,
      title: 'high_rate',
      value: 'rate',
      selected: false,
    },

  ]
  query: any;
  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activateRoute.queryParamMap
      .subscribe(page => {
        this.query = page['params'];
      });
  }

  getArrangmentValue(value) {
    if (value === 'rate') {
      this.step = 'rate';
    }
    if (value === 'max_price') {
      this.step = 'max_price';
    }
    if (value === 'min_price') {
      this.step = 'min_price';
    }


    let clone = Object.assign({}, this.query);
    clone.sort = value;
    this.query = clone;
    if (value === 'clear') {
      this.step = '';
      delete clone.sort;
    }
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/`], {
      relativeTo: this.activateRoute,
      queryParams: clone
    });
  }

}
