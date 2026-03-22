import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecurringDraftRoutingModule } from './recurring-draft-routing.module';
import { RecurringDraftComponent } from './recurring-draft.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecurringDraftComponent
  ],
  imports: [
    CommonModule,
    RecurringDraftRoutingModule,
    SharedModule
  ]
})
export class RecurringDraftModule { }
