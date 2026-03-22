import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchasesOrderComponent } from './add-purchases-order.component';

const routes: Routes = [{ path: '', component: AddPurchasesOrderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPurchasesOrderRoutingModule { }
