import { Component, OnInit } from '@angular/core';
import { HttpUtilityService } from 'src/app/shared/services/utility.service';
import { map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  config: any;
  constructor(
    private httpUtilityService: HttpUtilityService
  ) { }

  ngOnInit() {
    this.httpUtilityService.getAboutUs().pipe(
      map((x: HttpResponse<any>) => x.body)
    ).subscribe(data => {
      this.config = data;
    });
  }

}
