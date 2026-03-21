import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditDeliveryChallansComponent } from './edit-delivery-challans.component';

const routes: Routes = [{ path: '', component: EditDeliveryChallansComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditDeliveryChallansRoutingModule { }
