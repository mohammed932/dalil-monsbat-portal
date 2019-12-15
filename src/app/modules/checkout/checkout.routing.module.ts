import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutComponent } from './checkout.component';

export const route: Routes = [
  {
    path: "",
    component: CheckoutComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  declarations: []
})
export class CheckoutRoutingModule { }
