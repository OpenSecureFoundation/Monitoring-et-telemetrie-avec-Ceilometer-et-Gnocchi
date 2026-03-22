import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersListRoutingModule } from './users-list-routing.module';
import { UsersListComponent } from './users-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UsersListComponent],
  imports: [CommonModule, UsersListRoutingModule, SharedModule],
})
export class UsersListModule {}
