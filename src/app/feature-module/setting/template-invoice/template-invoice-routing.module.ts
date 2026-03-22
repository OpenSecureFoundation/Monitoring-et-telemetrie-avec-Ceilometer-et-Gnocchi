import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateInvoiceComponent } from './template-invoice.component';

const routes: Routes = [{ path: '', component: TemplateInvoiceComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemplateInvoiceRoutingModule { }
