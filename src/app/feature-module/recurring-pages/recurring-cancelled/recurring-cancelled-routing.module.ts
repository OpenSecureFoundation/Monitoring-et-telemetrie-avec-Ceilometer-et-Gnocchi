import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringCancelledComponent } from './recurring-cancelled.component';

const routes: Routes = [{ path: '', component: RecurringCancelledComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringCancelledRoutingModule { }
