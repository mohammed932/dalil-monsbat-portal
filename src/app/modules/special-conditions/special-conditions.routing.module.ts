import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SpecialConditionsComponent } from './special-conditions.component';

export const route: Routes = [
  {
    path: "",
    component: SpecialConditionsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  declarations: []
})
export class SpecialConditionsRoutingModule { }
