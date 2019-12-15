import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { HttpUtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  aboutUs: any;
  constructor(
    private router: Router,
    private httpAboutUsService: HttpUtilityService
  ) { }

  ngOnInit() {
    this.httpAboutUsService.getAboutUs().subscribe(data => {
      console.log(data);
      this.aboutUs = data.body;
    })
  }



}
