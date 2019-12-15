import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from 'src/app/shared/shared.module';
import { SpecialConditionsComponent } from './special-conditions.component';
import { SpecialConditionsRoutingModule } from './special-conditions.routing.module';

@NgModule({
  imports: [CommonModule, SpecialConditionsRoutingModule, SharedModule],
  declarations: [SpecialConditionsComponent]
})
export class SpecialConditionsModule { }
