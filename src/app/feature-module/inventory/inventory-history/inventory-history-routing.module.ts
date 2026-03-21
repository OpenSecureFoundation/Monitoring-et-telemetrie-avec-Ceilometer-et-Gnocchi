import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryHistoryComponent } from './inventory-history.component';

const routes: Routes = [{ path: '', component: InventoryHistoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryHistoryRoutingModule { }
