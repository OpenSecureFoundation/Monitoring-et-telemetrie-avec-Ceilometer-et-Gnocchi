import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DebitNotesRoutingModule } from './debit-notes-routing.module';
import { DebitNotesComponent } from './debit-notes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DebitNotesComponent
  ],
  imports: [
    CommonModule,
    DebitNotesRoutingModule,
    SharedModule
  ]
})
export class DebitNotesModule { }
