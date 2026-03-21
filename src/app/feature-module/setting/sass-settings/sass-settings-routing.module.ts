import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SassSettingsComponent } from './sass-settings.component';

const routes: Routes = [{ path: '', component: SassSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SassSettingsRoutingModule { }
