import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllInventoryComponent } from './all-inventory.component';

const routes: Routes = [{ path: '', component: AllInventoryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AllInventoryRoutingModule { }
