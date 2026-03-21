import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cashreceipt1Component } from './cashreceipt1.component';

const routes: Routes = [{ path: '', component: Cashreceipt1Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Cashreceipt1RoutingModule { }
