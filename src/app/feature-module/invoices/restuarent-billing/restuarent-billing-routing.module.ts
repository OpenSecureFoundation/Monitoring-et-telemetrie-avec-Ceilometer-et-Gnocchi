import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestuarentBillingComponent } from './restuarent-billing.component';

const routes: Routes = [{ path: '', component: RestuarentBillingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestuarentBillingRoutingModule { }
