import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToastsComponent } from './toasts.component';

const routes: Routes = [{ path: '', component: ToastsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToastsRoutingModule { }
