import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActiveCustomersComponent } from './active-customers.component';

const routes: Routes = [{ path: '', component: ActiveCustomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveCustomersRoutingModule { }
