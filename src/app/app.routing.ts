import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserlayoutComponent } from './core/userlayout/userlayout.component';
import { CanActivateViaAuthGuard } from './modules/auth/auth-guard/auth.guard';
import { CanActivateCheckoutGuard } from './modules/auth/auth-guard/checkout.guard';

export const routes: Routes = [
  {
    path: "",
    component: UserlayoutComponent,
    children: [
      {
        path: "",
        loadChildren: "./modules/home/home.module#HomeModule",
        pathMatch: "full"
      },
      {
        path: "search-results",
        loadChildren: "./modules/searchResults/searchResults.module#SearchResultsModule",
      },
      {
        path: "checkout",
        loadChildren: "./modules/checkout/checkout.module#CheckoutModule",
        canActivate: [CanActivateCheckoutGuard]
      },
      {
        path: "reservation",
        loadChildren: "./modules/reservation/reservation.module#ReservationModule",
      },
      {
        path: "about-us",
        loadChildren: "./modules/about-us/about-us.module#AboutUsModule",
      },      
      {
        path: "special-conditions",
        loadChildren: "./modules/special-conditions/special-conditions.module#SpecialConditionsModule",
      },      
      {
        path: "frequently-asked-questions",
        loadChildren: "./modules/terms/terms.module#TermsModule",
      },
      {
        path: "auth",
        loadChildren: "./modules/auth/auth.module#AuthModule",
        canActivate: [CanActivateViaAuthGuard]
      },
    ]
  },
  {
    path: "auth",
    loadChildren: "./modules/auth/auth.module#AuthModule",
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
