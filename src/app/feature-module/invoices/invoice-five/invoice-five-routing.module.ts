import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFiveComponent } from './invoice-five.component';

const routes: Routes = [{ path: '', component: InvoiceFiveComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceFiveRoutingModule { }
