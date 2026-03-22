import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cashreceipt2Component } from './cashreceipt2.component';

const routes: Routes = [{ path: '', component: Cashreceipt2Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Cashreceipt2RoutingModule { }
