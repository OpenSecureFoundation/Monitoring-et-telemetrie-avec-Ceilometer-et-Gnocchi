import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Cashreceipt4Component } from './cashreceipt4.component';

const routes: Routes = [{ path: '', component: Cashreceipt4Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Cashreceipt4RoutingModule { }
