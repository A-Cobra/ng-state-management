import { Component, EventEmitter } from '@angular/core';

import {
  headerBrand,
  logOutConfig,
  navigationOptions,
} from '../../utils/sidebar-options';
import { MOCK_USER_LAYOUT } from '../../tests/layout-mocks';

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
  userData = MOCK_USER_LAYOUT;

  logoOut() {
    // this.logoutEvent.emit(event);
    console.log('LOGOUT');
  }

  navbarExpands() {
    this.isExpanded = !this.isExpanded;
  }
}
