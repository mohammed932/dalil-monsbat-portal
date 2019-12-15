import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TermsComponent } from './terms.component';

export const route: Routes = [
  {
    path: "",
    component: TermsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  declarations: []
})
export class TermsRoutingModule { }
