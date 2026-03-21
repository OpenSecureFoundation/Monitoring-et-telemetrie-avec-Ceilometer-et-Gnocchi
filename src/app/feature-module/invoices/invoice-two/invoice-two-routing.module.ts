import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceTwoComponent } from './invoice-two.component';

const routes: Routes = [{ path: '', component: InvoiceTwoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceTwoRoutingModule { }
