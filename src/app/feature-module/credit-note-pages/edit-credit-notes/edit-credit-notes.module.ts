import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditCreditNotesRoutingModule } from './edit-credit-notes-routing.module';
import { EditCreditNotesComponent } from './edit-credit-notes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EditCreditNotesComponent
  ],
  imports: [
    CommonModule,
    EditCreditNotesRoutingModule,
    SharedModule
  ]
})
export class EditCreditNotesModule { }
