import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceSubscriptionComponent } from './invoice-subscription.component';

const routes: Routes = [{ path: '', component: InvoiceSubscriptionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceSubscriptionRoutingModule { }
