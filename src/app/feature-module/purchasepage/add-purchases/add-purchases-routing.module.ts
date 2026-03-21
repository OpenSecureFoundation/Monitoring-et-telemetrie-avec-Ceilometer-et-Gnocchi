import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPurchasesComponent } from './add-purchases.component';

const routes: Routes = [{ path: '', component: AddPurchasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPurchasesRoutingModule { }
