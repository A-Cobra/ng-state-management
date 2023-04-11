import { Component } from '@angular/core';

import { LayoutService } from '../../services/layout.service';

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
  constructor(private layoutService: LayoutService) {}

  navigationConfig = navigationOptions;
  logOutConfiguration = logOutConfig;
  headerBrandConfig = headerBrand;
  isExpanded = false;
  userData = MOCK_USER_LAYOUT;

  appUuidToNumber = this.layoutService.uuidToNumber;

  logoOut() {
    console.log('LOGOUT');
  }

  navbarExpands() {
    this.isExpanded = !this.isExpanded;
  }
}
