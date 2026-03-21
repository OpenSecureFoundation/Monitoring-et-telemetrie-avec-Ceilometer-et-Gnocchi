import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InternetBillingComponent } from './internet-billing.component';

const routes: Routes = [{ path: '', component: InternetBillingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InternetBillingRoutingModule { }
