import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankAccountRoutingModule } from './bank-account-routing.module';
import { BankAccountComponent } from './bank-account.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    BankAccountComponent
  ],
  imports: [
    CommonModule,
    BankAccountRoutingModule,
    SharedModule
   
  ]
})
export class BankAccountModule { }
