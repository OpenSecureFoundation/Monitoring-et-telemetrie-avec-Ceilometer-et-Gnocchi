import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimplineComponent } from './simpline.component';

const routes: Routes = [{ path: '', component: SimplineComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SimplineRoutingModule { }
