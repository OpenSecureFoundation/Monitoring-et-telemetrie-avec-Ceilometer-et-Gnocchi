import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchaseReturnComponent } from './add-purchase-return.component';

const routes: Routes = [{ path: '', component: AddPurchaseReturnComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPurchaseReturnRoutingModule { }
