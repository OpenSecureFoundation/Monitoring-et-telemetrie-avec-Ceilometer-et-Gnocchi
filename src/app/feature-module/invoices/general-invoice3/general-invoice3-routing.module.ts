import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeneralInvoice3Component } from './general-invoice3.component';

const routes: Routes = [{ path: '', component: GeneralInvoice3Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeneralInvoice3RoutingModule { }
