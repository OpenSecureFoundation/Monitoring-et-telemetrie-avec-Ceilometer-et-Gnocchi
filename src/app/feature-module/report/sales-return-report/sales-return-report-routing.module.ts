import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesReturnReportComponent } from './sales-return-report.component';

const routes: Routes = [{ path: '', component: SalesReturnReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesReturnReportRoutingModule { }
