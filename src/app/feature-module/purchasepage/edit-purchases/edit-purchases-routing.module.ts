import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPurchasesComponent } from './edit-purchases.component';

const routes: Routes = [{ path: '', component: EditPurchasesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditPurchasesRoutingModule { }
