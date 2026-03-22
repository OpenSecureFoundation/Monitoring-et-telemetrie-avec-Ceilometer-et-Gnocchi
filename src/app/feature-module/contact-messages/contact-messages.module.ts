import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactMessagesRoutingModule } from './contact-messages-routing.module';
import { ContactMessagesComponent } from './contact-messages.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ContactMessagesComponent
  ],
  imports: [
    CommonModule,
    ContactMessagesRoutingModule,
    SharedModule

  ]
})
export class ContactMessagesModule { }
