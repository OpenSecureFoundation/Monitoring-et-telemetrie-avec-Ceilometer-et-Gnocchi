import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralInvoice4Component } from './general-invoice4.component';

const routes: Routes = [{ path: '', component: GeneralInvoice4Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInvoice4RoutingModule { }
