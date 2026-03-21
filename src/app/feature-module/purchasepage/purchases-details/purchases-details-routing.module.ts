import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PurchasesDetailsComponent } from './purchases-details.component';

const routes: Routes = [{ path: '', component: PurchasesDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchasesDetailsRoutingModule { }
