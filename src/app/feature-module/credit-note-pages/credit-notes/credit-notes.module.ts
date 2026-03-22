import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditNotesRoutingModule } from './credit-notes-routing.module';
import { CreditNotesComponent } from './credit-notes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    CreditNotesComponent
  ],
  imports: [
    CommonModule,
    CreditNotesRoutingModule,
    SharedModule
  ]
})
export class CreditNotesModule { }
