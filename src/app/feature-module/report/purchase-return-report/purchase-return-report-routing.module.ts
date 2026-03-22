import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseReturnReportComponent } from './purchase-return-report.component';

const routes: Routes = [{ path: '', component: PurchaseReturnReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseReturnReportRoutingModule { }
