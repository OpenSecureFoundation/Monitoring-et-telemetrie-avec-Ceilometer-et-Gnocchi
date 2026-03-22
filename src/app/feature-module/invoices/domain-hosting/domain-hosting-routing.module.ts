import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DomainHostingComponent } from './domain-hosting.component';

const routes: Routes = [{ path: '', component: DomainHostingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomainHostingRoutingModule { }
