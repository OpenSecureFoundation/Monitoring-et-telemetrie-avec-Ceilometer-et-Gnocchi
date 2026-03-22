import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringComponent } from './recurring.component';

const routes: Routes = [{ path: '', component: RecurringComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringRoutingModule { }
