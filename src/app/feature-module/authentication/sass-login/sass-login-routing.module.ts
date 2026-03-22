import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SassLoginComponent } from './sass-login.component';

const routes: Routes = [{ path: '', component: SassLoginComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SassLoginRoutingModule { }
