import { Component, OnInit } from '@angular/core';
import { HttpCheckoutService } from './services/checkout.service';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  property = JSON.parse(localStorage.getItem('property'));
  date = localStorage.getItem('reservationDate');
  reservationData: any;
  loading: boolean;
  modalRef: BsModalRef;
  isConfirmed = false;
  constructor(
    private httpCheckoutService: HttpCheckoutService,
    private modalService: BsModalService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

  }

  confirmCheckout(template) {
    let ngbModalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.show(template, ngbModalOptions);
  }

  getPropertyPrice(property) {
    let price: number;
    if (!property.is_offer) {
      price = property.price;
      return price;
    }
    price = property.offer_price;
    return price;
  }
  
  calculateWillpay() {
    let downPayment;
    if (this.property.is_offer) {
      downPayment = (this.property.offer_price * this.property.category.down_payment_percentage) / 100;
    } else {
      downPayment = (this.property.price * this.property.category.down_payment_percentage) / 100;
    }
    return downPayment;
  }



  payNow() {
    this.loading = true;
    this.isConfirmed = true;

    this.httpCheckoutService.payNowApi('payfort')
      .pipe(
        finalize(() => this.loading = false)
      ).subscribe(data => {
        if (data.status === 200) {
          localStorage.setItem('checkout', 'false');
          localStorage.removeItem('property');
          this.reservationData = data.body;
          console.log(data);
        }
      }, err => {
        console.log(err);
        this.toastr.error(err.error.message);
      })
  }

  goToMyReservation() {
    this.modalRef.hide();

    this.router.navigate([`/${localStorage.getItem('LOCALIZE_DEFAULT_LANGUAGE')}/reservation/`]);

  }

}
