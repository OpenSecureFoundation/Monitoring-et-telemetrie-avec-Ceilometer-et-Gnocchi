import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceFourAComponent } from './invoice-four-a.component';

const routes: Routes = [{ path: '', component: InvoiceFourAComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceFourARoutingModule { }
