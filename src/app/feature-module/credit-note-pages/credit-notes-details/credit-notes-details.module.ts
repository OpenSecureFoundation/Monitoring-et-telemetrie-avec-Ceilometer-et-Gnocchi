import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditNotesDetailsRoutingModule } from './credit-notes-details-routing.module';
import { CreditNotesDetailsComponent } from './credit-notes-details.component';


@NgModule({
  declarations: [
    CreditNotesDetailsComponent
  ],
  imports: [
    CommonModule,
    CreditNotesDetailsRoutingModule
  ]
})
export class CreditNotesDetailsModule { }
