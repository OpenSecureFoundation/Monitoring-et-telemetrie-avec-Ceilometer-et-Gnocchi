import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrapDropComponent } from './drap-drop.component';

const routes: Routes = [{ path: '', component: DrapDropComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrapDropRoutingModule { }
