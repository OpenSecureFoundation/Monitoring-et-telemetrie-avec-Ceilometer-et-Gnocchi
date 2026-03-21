import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactiveCustomersComponent } from './deactive-customers.component';

const routes: Routes = [{ path: '', component: DeactiveCustomersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeactiveCustomersRoutingModule { }
