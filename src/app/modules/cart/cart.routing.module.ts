import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CartComponent } from "./cart.component";

export const route: Routes = [
  {
    path: "",
    component: CartComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  declarations: []
})
export class CartRoutingModule {}
