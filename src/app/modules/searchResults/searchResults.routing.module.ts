import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SearchResultsComponent } from './search-results.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';

export const route: Routes = [
  {
    path: "",
    component: SearchResultsComponent
  },
  {
    path: 'item-details/:id',
    component: ItemDetailsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(route)],
  declarations: []
})
export class SearchResultsRoutingModule { }
