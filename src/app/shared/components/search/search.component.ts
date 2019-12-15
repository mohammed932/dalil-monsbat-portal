import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpUtilityService } from '../../services/utility.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  cities: any;
  cityId: string;
  date = new Date();
  occasions: any[];
  occasionId: any;
  maxDate: Date;
  minDate: Date;


  constructor(
    private formBuilder: FormBuilder,
    private httpUtilityService: HttpUtilityService,
    public datepipe: DatePipe,
    private router: Router
  ) {
    this.maxDate = new Date();
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
    this.maxDate.setDate(this.maxDate.getDate() + 1);
    this.date.setDate(this.date.getDate() + 1);
  }

  ngOnInit() {
    this.fetchCities();
    this.fetchOccasion();
  }


  fetchCities() {
    this.httpUtilityService.getAllCities()
      .subscribe(data => {
        this.cities = data.body;
      })
  }

  fetchOccasion() {
    this.httpUtilityService.getAllOccasions()
      .subscribe(data => {
        this.occasions = data.body;
      })
  }

  submitSearch() {
    const searchData = {
      date: this.formatDate(this.date),
      occasion: this.occasionId,
      city: this.cityId
    }
    this.httpUtilityService.setFilterData(searchData);
    this.router.navigate([`${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results`], { queryParams: searchData });
  }

  formatDate(selectedDate) {
    const currentDate = selectedDate;
    let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
    return latest_date || new Date()
  }

}
