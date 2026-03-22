import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SassRegisterComponent } from './sass-register.component';

const routes: Routes = [{ path: '', component: SassRegisterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SassRegisterRoutingModule { }
