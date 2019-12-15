import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from 'src/app/shared/shared.module';
import { TermsRoutingModule } from './terms.routing.module';
import { TermsComponent } from './terms.component';

@NgModule({
  imports: [CommonModule, TermsRoutingModule, SharedModule],
  declarations: [TermsComponent]
})
export class TermsModule { }
