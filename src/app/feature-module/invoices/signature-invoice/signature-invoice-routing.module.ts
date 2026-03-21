import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignatureInvoiceComponent } from './signature-invoice.component';

const routes: Routes = [{ path: '', component: SignatureInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignatureInvoiceRoutingModule { }
