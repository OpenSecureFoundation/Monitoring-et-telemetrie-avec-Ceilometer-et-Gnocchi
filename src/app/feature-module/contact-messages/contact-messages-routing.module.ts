import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactMessagesComponent } from './contact-messages.component';

const routes: Routes = [{ path: '', component: ContactMessagesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactMessagesRoutingModule { }
