import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RangesliderComponent } from './rangeslider.component';

const routes: Routes = [{ path: '', component: RangesliderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RangesliderRoutingModule { }
