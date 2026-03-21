import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoicesUnpaidComponent } from './invoices-unpaid.component';

const routes: Routes = [{ path: '', component: InvoicesUnpaidComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoicesUnpaidRoutingModule { }
