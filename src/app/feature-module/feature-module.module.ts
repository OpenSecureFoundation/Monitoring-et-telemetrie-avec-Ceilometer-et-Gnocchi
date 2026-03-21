import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatureModuleRoutingModule } from './feature-module-routing.module';
import { FeatureModuleComponent } from './feature-module.component';
import { SharedModule } from '../shared/sharedIndex';
import { HeaderOneComponent } from './common/headers/header-one/header-one.component';
import { HeaderTwoComponent } from './common/headers/header-two/header-two.component';
import { HeaderThreeComponent } from './common/headers/header-three/header-three.component';
import { HeaderFourComponent } from './common/headers/header-four/header-four.component';
import { HeaderFiveComponent } from './common/headers/header-five/header-five.component';
import { SettingsMenuComponent } from './common/settings-menu/settings-menu.component';
import { SpinnerComponent } from './common/spinner/spinner.component';
import { SideMenuOneComponent } from './common/side-menus/side-menu-one/side-menu-one.component';
import { SideMenuFiveComponent } from './common/side-menus/side-menu-five/side-menu-five.component';
import { SideMenuTwoComponent } from './common/side-menus/side-menu-two/side-menu-two.component';
import { SideMenuThreeComponent } from './common/side-menus/side-menu-three/side-menu-three.component';
import { SideMenuFourComponent } from './common/side-menus/side-menu-four/side-menu-four.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    FeatureModuleComponent,
    HeaderOneComponent,
    HeaderTwoComponent,
    HeaderThreeComponent,
    HeaderFourComponent,
    HeaderFiveComponent,
    SettingsMenuComponent,
    SpinnerComponent,
    SideMenuOneComponent,
    SideMenuFiveComponent,
    SideMenuTwoComponent,
    SideMenuThreeComponent,
    SideMenuFourComponent,
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    FeatureModuleRoutingModule,
    SharedModule,
  ],
})
export class FeatureModuleModule {}
