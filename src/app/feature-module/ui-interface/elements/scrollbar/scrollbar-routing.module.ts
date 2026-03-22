import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScrollbarComponent } from './scrollbar.component';

const routes: Routes = [{ path: '', component: ScrollbarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScrollbarRoutingModule { }
