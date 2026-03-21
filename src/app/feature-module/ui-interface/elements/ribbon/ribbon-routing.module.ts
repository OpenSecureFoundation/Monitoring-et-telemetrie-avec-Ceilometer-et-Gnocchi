import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RibbonComponent } from './ribbon.component';

const routes: Routes = [{ path: '', component: RibbonComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RibbonRoutingModule { }
