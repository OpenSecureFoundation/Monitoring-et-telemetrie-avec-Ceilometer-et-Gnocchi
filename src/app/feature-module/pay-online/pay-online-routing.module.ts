import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayOnlineComponent } from './pay-online.component';

const routes: Routes = [{ path: '', component: PayOnlineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayOnlineRoutingModule { }
