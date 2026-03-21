import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralInvoice2Component } from './general-invoice2.component';

const routes: Routes = [{ path: '', component: GeneralInvoice2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInvoice2RoutingModule { }
