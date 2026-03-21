import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignaturePreviewInvoiceComponent } from './signature-preview-invoice.component';

const routes: Routes = [{ path: '', component: SignaturePreviewInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignaturePreviewInvoiceRoutingModule { }
