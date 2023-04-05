import { Component, EventEmitter } from '@angular/core';

import {
  headerBrand,
  logOutConfig,
  navigationOptions,
} from '../../utils/sidebar-options';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  expandEvent = new EventEmitter<boolean>();
  logoutEvent = new EventEmitter<boolean>();

  navigationConfig = navigationOptions;
  logOutConfiguration = logOutConfig;
  headerBrandConfig = headerBrand;
  isExpanded = false;

  logoOut() {
    // this.logoutEvent.emit(event);
    console.log('LOGOUT');
  }

  navbarExpands() {
    this.isExpanded = !this.isExpanded;
  }
}
