import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFourComponent } from './invoice-four.component';

const routes: Routes = [{ path: '', component: InvoiceFourComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceFourRoutingModule { }
