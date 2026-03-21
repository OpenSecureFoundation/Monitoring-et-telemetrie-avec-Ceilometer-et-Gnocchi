import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditNotePagesRoutingModule } from './credit-note-pages-routing.module';
import { CreditNotePagesComponent } from './credit-note-pages.component';


@NgModule({
  declarations: [
    CreditNotePagesComponent
  ],
  imports: [
    CommonModule,
    CreditNotePagesRoutingModule
  ]
})
export class CreditNotePagesModule { }
