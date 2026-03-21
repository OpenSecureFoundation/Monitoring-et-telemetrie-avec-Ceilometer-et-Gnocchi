import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MailPayInvoiceComponent } from './mail-pay-invoice.component';

const routes: Routes = [{ path: '', component: MailPayInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MailPayInvoiceRoutingModule { }
