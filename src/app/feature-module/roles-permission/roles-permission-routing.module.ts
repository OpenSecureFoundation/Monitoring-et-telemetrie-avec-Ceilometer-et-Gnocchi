import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesPermissionComponent } from './roles-permission.component';

const routes: Routes = [{ path: '', component: RolesPermissionComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesPermissionRoutingModule { }
