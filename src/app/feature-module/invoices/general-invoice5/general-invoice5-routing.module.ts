import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralInvoice5Component } from './general-invoice5.component';

const routes: Routes = [{ path: '', component: GeneralInvoice5Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInvoice5RoutingModule { }
