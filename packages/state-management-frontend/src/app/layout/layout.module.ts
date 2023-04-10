import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';

import {
  ClappSideBarModule,
  ClappTopbarModule,
  ClappImageDisplayModule,
} from '@clapp1/clapp-angular';

@NgModule({
  declarations: [SidebarComponent, TopbarComponent],
  imports: [
    CommonModule,
    ClappSideBarModule,
    ClappTopbarModule,
    ClappImageDisplayModule,
  ],
  exports: [SidebarComponent, TopbarComponent],
})
export class LayoutModule {}
