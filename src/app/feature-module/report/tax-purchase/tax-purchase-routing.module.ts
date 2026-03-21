import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxPurchaseComponent } from './tax-purchase.component';

const routes: Routes = [{ path: '', component: TaxPurchaseComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxPurchaseRoutingModule { }
