import { Component, OnInit, TemplateRef } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap';
import { HttpReservationService } from './services/reservation.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit {
  property = JSON.parse(localStorage.getItem('property'));
  date = localStorage.getItem('reservationDate');
  reservationData: any;
  loading: boolean;
  modalRef: BsModalRef;
  isConfirmed = false;
  selectedReservation: any;
  constructor(
    private httpReservationService: HttpReservationService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.httpReservationService.getPropertyReservation()
      .subscribe((data: HttpResponse<any>) => {
        console.log(data);
        if (data.status === 200) {
          this.reservationData = data.body;
        }
      })
  }

  confirmCheckout(template) {
    let ngbModalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.show(template, ngbModalOptions);
  }

  calculateWillpay() {
    let downPayment;
    if (this.selectedReservation.property.is_offer) {
      downPayment = (this.selectedReservation.property.offer_price * this.selectedReservation.property.category.down_payment_percentage) / 100;
    } else {
      downPayment = (this.selectedReservation.property.price * this.selectedReservation.property.category.down_payment_percentage) / 100;
    }
    return downPayment;
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

  openModal(template: TemplateRef<any>, reservationData) {
    console.log(reservationData);
    this.selectedReservation = reservationData;
    this.modalRef = this.modalService.show(template);
  }


  goToMyReservation() {
    console.log('clicked!!!');
  }

}
