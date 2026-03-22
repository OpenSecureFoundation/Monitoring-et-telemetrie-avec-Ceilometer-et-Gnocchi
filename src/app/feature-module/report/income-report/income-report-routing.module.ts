import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IncomeReportComponent } from './income-report.component';

const routes: Routes = [{ path: '', component: IncomeReportComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IncomeReportRoutingModule { }
