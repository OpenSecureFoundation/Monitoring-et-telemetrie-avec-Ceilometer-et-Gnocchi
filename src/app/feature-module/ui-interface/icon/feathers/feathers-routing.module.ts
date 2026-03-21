import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeathersComponent } from './feathers.component';

const routes: Routes = [{ path: '', component: FeathersComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeathersRoutingModule { }
