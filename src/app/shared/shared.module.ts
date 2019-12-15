import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { NgxBoostrapModule } from './ngx-bootstrap.module';
import { AddChaletsComponent } from './components/add-chalets/add-chalets.component';
import { SidebarModule } from 'ng-sidebar';
import { ClickOutsideModule } from 'ng4-click-outside';
import { ItemComponent } from './components/item/item.component';
import { NguCarouselModule } from '@ngu/carousel';
import { NgxGalleryModule } from 'ngx-gallery';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { SortComponent } from './components/sort/sort.component';
import { LoaderComponent } from './components/loader/loader.component';
import { RateComponent } from './components/rate/rate.component';
import { AgmCoreModule } from '@agm/core';
import { LayoutModule } from '@angular/cdk/layout';
import { NoItemsComponent } from './components/no-items/no-items.component';
import { LocalizeRouterModule } from 'localize-router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ToastrModule } from 'ngx-toastr';
import { CounterDirective } from './directive/counter.directive';
import { PayNowButtonComponent } from './components/pay-now-button/pay-now-button.component';
import { CustomButtonComponent } from './components/cancel-btn/custom-btn.component';
import { TruncatePipe } from './directive/truncate.pipe';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        NgxBoostrapModule,
        ClickOutsideModule,
        NguCarouselModule,
        NgxGalleryModule,
        NgSelectModule,
        NgxPaginationModule,
        AgmCoreModule.forRoot({
            apiKey: "AIzaSyAwsSpAS7gv7AA00Ce8ljPKII6lbme6EbU",
            libraries: ['places', 'drawing', 'geometry']
        }),
        ToastrModule.forRoot(),
        AngularSvgIconModule,
        LayoutModule,
        TranslateModule,
        LocalizeRouterModule,
    ],
    exports: [
        ReactiveFormsModule,
        NgxBoostrapModule,
        RouterModule,
        ClickOutsideModule,
        NguCarouselModule,
        NgxGalleryModule,
        NgSelectModule,
        NgxPaginationModule,
        FormsModule,
        AgmCoreModule,
        SearchComponent,
        AddChaletsComponent,
        CustomButtonComponent,
        CounterDirective,
        SortComponent,
        SidebarModule,
        ItemComponent,
        LoaderComponent,
        NoItemsComponent,
        PayNowButtonComponent,
        RateComponent,
        LayoutModule,
        TranslateModule,
        LocalizeRouterModule,
        AngularSvgIconModule,
        ToastrModule,
        
    ],
    declarations: [
        SearchComponent,
        AddChaletsComponent,
        CustomButtonComponent,
        ItemComponent,
        SortComponent,
        LoaderComponent,
        RateComponent,
        NoItemsComponent,
        CounterDirective,
        PayNowButtonComponent,
        TruncatePipe
    ],
    providers: [DatePipe]
})
export class SharedModule { }
