import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LayoutService } from './services/layout.service';

import {
  ClappSideBarModule,
  ClappTopbarModule,
  ClappImageDisplayModule,
  ClappNotificationModule,
} from '@clapp1/clapp-angular';

@NgModule({
  declarations: [SidebarComponent, TopbarComponent],
  imports: [
    CommonModule,
    ClappSideBarModule,
    ClappTopbarModule,
    ClappImageDisplayModule,
    ClappNotificationModule,
  ],
  exports: [SidebarComponent, TopbarComponent],
  providers: [LayoutService],
})
export class LayoutModule {}
