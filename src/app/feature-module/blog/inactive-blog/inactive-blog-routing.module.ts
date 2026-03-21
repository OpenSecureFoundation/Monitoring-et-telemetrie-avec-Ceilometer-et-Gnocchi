import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InactiveBlogComponent } from './inactive-blog.component';

const routes: Routes = [{ path: '', component: InactiveBlogComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InactiveBlogRoutingModule { }
