import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormFileuploadComponent } from './form-fileupload.component';

const routes: Routes = [{ path: '', component: FormFileuploadComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormFileuploadRoutingModule { }
