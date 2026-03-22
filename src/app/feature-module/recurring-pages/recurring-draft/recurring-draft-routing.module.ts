import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecurringDraftComponent } from './recurring-draft.component';

const routes: Routes = [{ path: '', component: RecurringDraftComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecurringDraftRoutingModule { }
