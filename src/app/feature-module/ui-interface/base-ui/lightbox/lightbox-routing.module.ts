import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LightboxComponent } from './lightbox.component';

const routes: Routes = [{ path: '', component: LightboxComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LightboxRoutingModule { }
