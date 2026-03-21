import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceOneAComponent } from './invoice-one-a.component';

const routes: Routes = [{ path: '', component: InvoiceOneAComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceOneARoutingModule { }
