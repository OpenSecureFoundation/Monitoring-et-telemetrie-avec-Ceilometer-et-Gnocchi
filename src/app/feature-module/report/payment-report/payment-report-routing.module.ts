import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaymentReportComponent } from './payment-report.component';

const routes: Routes = [{ path: '', component: PaymentReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentReportRoutingModule { }
