import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditBlogsComponent } from './edit-blogs.component';

const routes: Routes = [{ path: '', component: EditBlogsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditBlogsRoutingModule { }
