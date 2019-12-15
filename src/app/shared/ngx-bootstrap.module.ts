import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressbarModule, ModalModule } from 'ngx-bootstrap';
import { RatingModule } from 'ngx-bootstrap/rating';

@NgModule({
    imports: [
        CommonModule,
        BsDatepickerModule.forRoot(),
        ProgressbarModule.forRoot(),
        ModalModule.forRoot(),
    ],
    exports: [
        BsDatepickerModule,
        ProgressbarModule,
        ModalModule
    ],
    declarations: [
    ]
})
export class NgxBoostrapModule { }
