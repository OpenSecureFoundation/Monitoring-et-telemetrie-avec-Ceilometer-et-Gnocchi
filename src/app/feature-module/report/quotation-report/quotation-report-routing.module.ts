import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationReportComponent } from './quotation-report.component';

const routes: Routes = [{ path: '', component: QuotationReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuotationReportRoutingModule { }
