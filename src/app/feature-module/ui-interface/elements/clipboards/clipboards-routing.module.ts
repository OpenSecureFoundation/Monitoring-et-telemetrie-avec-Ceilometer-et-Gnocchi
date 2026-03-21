import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClipboardsComponent } from './clipboards.component';

const routes: Routes = [{ path: '', component: ClipboardsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClipboardsRoutingModule { }
