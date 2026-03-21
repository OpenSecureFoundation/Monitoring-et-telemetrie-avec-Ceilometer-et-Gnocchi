import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlagComponent } from './flag.component';

const routes: Routes = [{ path: '', component: FlagComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlagRoutingModule { }
