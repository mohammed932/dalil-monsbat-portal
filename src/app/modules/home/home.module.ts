import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home.component";
import { HomeRoutingModule } from "./home.routing.module";
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { SingleCategoryComponent } from './components/single-category/single-category.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';

@NgModule({
  imports: [CommonModule,SharedModule, RouterModule, HomeRoutingModule, SharedModule],
  declarations: [HomeComponent, SingleCategoryComponent, ListCategoriesComponent]
})
export class HomeModule { }
