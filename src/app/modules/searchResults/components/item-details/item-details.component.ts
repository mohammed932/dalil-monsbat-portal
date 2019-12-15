import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpPropertyService } from 'src/app/shared/services/properties.service';
import { switchMap, tap, map, finalize } from 'rxjs/operators';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/modules/auth/service/auth.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.scss']
})
export class ItemDetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  property: any;
  loading: boolean = true;
  center: any = {
    lng: 46.72185,
    lat: 24.68773
  };
  isOpen = false;
  minDate: Date;
  gallaryHeight = '450px';
  dateFromUrl: any;
  passDate: any;
  isAvaliable: boolean;
  date = new Date();
  propertyId: string;
  query = {};
  loadingBtn: boolean;
  btnBlock = true;
  constructor(
    private ActiveRoute: ActivatedRoute,
    private httpPropertyService: HttpPropertyService,
    public breakpointObserver: BreakpointObserver,
    private datepipe: DatePipe,
    private router: Router,
    private activateRoute: ActivatedRoute,
  ) {
    this.minDate = new Date();
    this.minDate.setDate(this.minDate.getDate());
  }

  ngOnInit() {
    this.ActiveRoute.queryParamMap.subscribe(data => {
      this.query['date'] = data.get('date');
      if (data.get('date')) {
        this.dateFromUrl = new Date(data.get('date').replace(/-/g, '/'));
      }
    });
    this.ActiveRoute.paramMap.subscribe(params => {
      this.getSingleProperty(params.get('id'), this.query).subscribe(data => {
        this.property = data.body;
        this.isAvaliable = this.property.is_available;
      }, err => {
        console.log(err);
      });
    })
    this.galleryOptions = [
      {
        width: '700px',
        height: '450px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        previewZoom: true,
        previewRotate: true

      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '360px',
        imagePercent: 80,
        thumbnailsColumns: 2,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
  }

  formatDate(selectedDate) {
    const currentDate = selectedDate;
    let latest_date = this.datepipe.transform(currentDate, 'yyyy-MM-dd');
    return latest_date || '';
  }

  getDate(event) {
    this.query['date'] = this.formatDate(event);
    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/search-results/item-details/${this.property._id}/`], {
      relativeTo: this.activateRoute,
      queryParams: this.query
    });
    this.loading = true;
    this.getSingleProperty(this.property._id, this.query).subscribe(data => {
      this.property = data.body;
      this.isAvaliable = this.property.is_available;
    }, err => {
      console.log(err);
    });
  }

  generateImagesSchema(imagesFromApi) {
    let images = [];
    for (let index = 0; index < imagesFromApi.length; index++) {
      const element = imagesFromApi[index];
      images.push(
        {
          small: element,
          medium: element,
          big: element
        }
      )
    }
    return images
  }

  getBackgroundStyle(imagepath) {
    console.log(imagepath)
    return {
      'background-image':'url(' + imagepath + ')'
    }
  }


  getSingleProperty(propertyId, date) {
    return this.httpPropertyService.getSingleProperty(propertyId, date).pipe(
      map(response => {
        response['body']['images'] = this.generateImagesSchema(response['body']['images'])
        return response;
      }),
      finalize(() => this.loading = false)
    )
  }
  changeDate() {
    this.isOpen = !this.isOpen;
  }

  payNow() {
    this.loadingBtn = true;
    const token = localStorage.getItem('dmpToken');
    localStorage.setItem('property', JSON.stringify(this.property));
    localStorage.setItem('checkout', 'true');
    localStorage.setItem('reservationDate', this.query['date']);
    if (!token) {
      this.router.navigateByUrl(`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/auth/login`);
      this.loadingBtn = false;
      return;
    }
    this.router.navigateByUrl(`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/checkout`);
    this.loadingBtn = false;
  }

}
