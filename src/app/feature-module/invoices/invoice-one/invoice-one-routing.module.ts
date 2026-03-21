import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceOneComponent } from './invoice-one.component';

const routes: Routes = [{ path: '', component: InvoiceOneComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceOneRoutingModule { }
