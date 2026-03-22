import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceThreeComponent } from './invoice-three.component';

const routes: Routes = [{ path: '', component: InvoiceThreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceThreeRoutingModule { }
