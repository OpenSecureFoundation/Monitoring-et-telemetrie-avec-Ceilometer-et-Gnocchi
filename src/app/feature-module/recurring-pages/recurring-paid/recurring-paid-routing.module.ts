import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringPaidComponent } from './recurring-paid.component';

const routes: Routes = [{ path: '', component: RecurringPaidComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringPaidRoutingModule { }
