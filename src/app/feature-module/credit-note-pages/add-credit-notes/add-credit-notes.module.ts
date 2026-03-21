import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddCreditNotesRoutingModule } from './add-credit-notes-routing.module';
import { AddCreditNotesComponent } from './add-credit-notes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    AddCreditNotesComponent
  ],
  imports: [
    CommonModule,
    AddCreditNotesRoutingModule,
    SharedModule
  ]
})
export class AddCreditNotesModule { }
