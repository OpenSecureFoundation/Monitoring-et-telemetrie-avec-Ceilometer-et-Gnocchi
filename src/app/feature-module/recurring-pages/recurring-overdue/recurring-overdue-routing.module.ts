import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringOverdueComponent } from './recurring-overdue.component';

const routes: Routes = [{ path: '', component: RecurringOverdueComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringOverdueRoutingModule { }
