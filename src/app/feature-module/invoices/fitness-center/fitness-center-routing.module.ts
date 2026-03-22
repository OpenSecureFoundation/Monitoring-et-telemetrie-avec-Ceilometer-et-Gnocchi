import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FitnessCenterComponent } from './fitness-center.component';

const routes: Routes = [{ path: '', component: FitnessCenterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FitnessCenterRoutingModule { }
