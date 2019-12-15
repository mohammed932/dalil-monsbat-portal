import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SearchResultsRoutingModule } from './searchResults.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchResultsComponent } from './search-results.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { FilterComponent } from './components/filter/filter.component';

@NgModule({
  imports: [CommonModule, SharedModule, SearchResultsRoutingModule],
  declarations: [SearchResultsComponent, ItemDetailsComponent, FilterComponent]
})
export class SearchResultsModule { }
