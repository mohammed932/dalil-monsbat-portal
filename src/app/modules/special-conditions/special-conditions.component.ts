import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-special-conditions',
  templateUrl: './special-conditions.component.html',
  styleUrls: ['./special-conditions.component.scss']
})
export class SpecialConditionsComponent implements OnInit {
  specialCondition: any;
  constructor(
    private router: Router,
    private httpAboutUsService: HttpUtilityService
  ) { }

  ngOnInit() {
    this.httpAboutUsService.getAboutUs().subscribe(data => {
      console.log(data);
      this.specialCondition = data.body;
      console.log(this.specialCondition)
    })
  }



}
