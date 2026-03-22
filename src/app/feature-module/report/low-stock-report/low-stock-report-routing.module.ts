import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LowStockReportComponent } from './low-stock-report.component';

const routes: Routes = [{ path: '', component: LowStockReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LowStockReportRoutingModule { }
