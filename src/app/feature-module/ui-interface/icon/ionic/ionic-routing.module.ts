import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicComponent } from './ionic.component';

const routes: Routes = [{ path: '', component: IonicComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IonicRoutingModule { }
