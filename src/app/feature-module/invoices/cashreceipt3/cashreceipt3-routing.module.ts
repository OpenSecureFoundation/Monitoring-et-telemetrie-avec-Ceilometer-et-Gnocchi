import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cashreceipt3Component } from './cashreceipt3.component';

const routes: Routes = [{ path: '', component: Cashreceipt3Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Cashreceipt3RoutingModule { }
