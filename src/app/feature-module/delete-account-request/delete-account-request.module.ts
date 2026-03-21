import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeleteAccountRequestRoutingModule } from './delete-account-request-routing.module';
import { DeleteAccountRequestComponent } from './delete-account-request.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    DeleteAccountRequestComponent
  ],
  imports: [
    CommonModule,
    DeleteAccountRequestRoutingModule,
    SharedModule
  ]
})
export class DeleteAccountRequestModule { }
