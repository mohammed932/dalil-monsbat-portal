import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppRoutingModule } from '../app.routing';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarModule } from 'ng-sidebar';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { ClickOutsideModule } from 'ng4-click-outside';
import { RouterModule } from '@angular/router';
import { NgxBoostrapModule } from '../shared/ngx-bootstrap.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    ClickOutsideModule,

  ],
  declarations: [UserlayoutComponent, HeaderComponent, SidebarComponent, FooterComponent],
  exports: [FooterComponent, HeaderComponent, ClickOutsideModule]
})
export class CoreModule { }
