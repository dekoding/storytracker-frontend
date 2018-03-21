import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// NGX-Bootstrap modules
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { TabsModule } from 'ngx-bootstrap/tabs';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    exports: [
        AccordionModule,
        AlertModule,
        ButtonsModule,
        CollapseModule,
        BsDatepickerModule,
        BsDropdownModule,
        ModalModule,
        RatingModule,
        TabsModule
    ]
})
export class VendorModule { }
