import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypiconComponent } from './typicon.component';

const routes: Routes = [{ path: '', component: TypiconComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypiconRoutingModule { }
