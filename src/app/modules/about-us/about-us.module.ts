import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AboutUsComponent } from './about-us.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutUsRoutingModule } from './about-us.routing.module';

@NgModule({
  imports: [CommonModule, AboutUsRoutingModule, SharedModule],
  declarations: [AboutUsComponent]
})
export class AboutUsModule { }
