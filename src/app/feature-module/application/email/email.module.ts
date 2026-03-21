import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailComponent } from './email.component';
import { EmailRoutingModule } from './email-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EmailComponent],
  imports: [CommonModule, EmailRoutingModule, SharedModule],
})
export class EmailModule {}
