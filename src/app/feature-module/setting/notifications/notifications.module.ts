import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications.component';
import { NotificationsRoutingModule } from './notifications-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [NotificationsComponent],
  imports: [CommonModule, NotificationsRoutingModule, SharedModule],
})
export class NotificationsModule {}
