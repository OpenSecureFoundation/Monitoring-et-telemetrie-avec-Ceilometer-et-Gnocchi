import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Pe7Component } from './pe7.component';

const routes: Routes = [{ path: '', component: Pe7Component }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Pe7RoutingModule { }
