import { Component, ViewChild, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './modules/auth/service/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap';
import { StarRatingComponent } from 'ng-starrating';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trif';
  modalRef: BsModalRef;
  max = 10;
  rate = 0;
  isReadonly = false;
  rateMaxNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  @ViewChild('template', { static: false }) template: TemplateRef<any>;
  property: any;
  radioItems: Array<number>;
  model = { rate: 1 };

  constructor(
    private modalService: BsModalService,
    private router: Router,
    private auth: AuthService,
    private http: HttpClient,
  ) {

    this.radioItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  }
  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    this.checkIsLoggin();
    this.checkIsRateExist();
  }

  onRate() {
    const rate = {
      rate: this.model.rate
    }
    this.http.post(`${environment.baseUrl}properties/${this.property['_id']}/rates`, rate, {
      observe: 'response'
    })
      .subscribe(data => {
        console.log(data);
        if (data.status === 200) {
          this.modalRef.hide();
        }
      })
  }

  checkIsLoggin() {
    let isLoggin = localStorage.getItem('dmpToken');
    if (isLoggin) {
      console.log('first condition')
      this.auth.isLogoutSubject.next(true);
    } else {
      console.log('second condition')
      this.auth.isLogoutSubject.next(false);
    }
    console.log('entereeeed !')
  }


  checkIsRateExist() {
    const isLogin = localStorage.getItem('isLogin');
    if (isLogin) {
      this.http.get
        (`${environment.baseUrl}users/${localStorage.getItem('userId')}/lastRate`)
        .subscribe(data => {
          let ngbModalOptions: ModalOptions = {
            backdrop: 'static',
            keyboard: false
          };
          if (data['is_completed'] && !data['is_rated']) {
            this.modalRef = this.modalService.show(
              this.template, ngbModalOptions
            );
            this.property = data['property'];
          }
        })
    }
  }

  onRateChange(event) {
    console.log(this.model);
  }

}
