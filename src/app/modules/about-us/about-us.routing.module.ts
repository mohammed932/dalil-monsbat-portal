import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from './about-us.component';

export const route: Routes = [
  {
    path: "",
    component: AboutUsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  declarations: []
})
export class AboutUsRoutingModule { }
