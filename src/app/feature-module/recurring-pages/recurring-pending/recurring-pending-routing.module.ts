import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringPendingComponent } from './recurring-pending.component';

const routes: Routes = [{ path: '', component: RecurringPendingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringPendingRoutingModule { }
