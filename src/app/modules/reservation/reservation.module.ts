import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReservationComponent } from './reservation.component';
import {  ReservationRoutingModule } from './reservation.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [CommonModule, ReservationRoutingModule, SharedModule],
  declarations: [ReservationComponent]
})
export class ReservationModule { }
