import { Component, EventEmitter } from '@angular/core';
import {
  HeaderBrand,
  LogOutConfig,
  NavigationItem,
} from '@clapp1/clapp-angular';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  expandEvent = new EventEmitter<boolean>();
  logoutEvent = new EventEmitter<boolean>();

  navigationMock: NavigationItem[] = [
    {
      menuIcon: 'ri-store-line',
      altText: 'businesses-icon',
      menuText: 'Businesses',
      baseUrl: '/businesses',
      allowedRoleIds: [1, 2],
    },
    {
      menuIcon: 'ri-store-3-line',
      altText: 'branches-icon',
      menuText: 'Branches',
      baseUrl: '/branches',
      allowedRoleIds: [1, 2, 3],
    },
    {
      menuIcon: 'ri-apps-line',
      altText: 'classification-icon',
      menuText: 'Classifications',
      baseUrl: '/classifications',
      allowedRoleIds: [1, 2, 3],
    },
  ];
  headerBrandMock: HeaderBrand = {
    expandedBrandSrc: '../../../../assets/templateImage.png',
    collapsedBrandSrc:
      'https://images.freejpg.com.ar/900/1502/sad-face-F100036676.jpg',
  };
  logOutConfigMock: LogOutConfig = {
    logOutIcon: 'ri-logout-box-line',
    logOutTitle: 'Log out',
  };
  isExpanded = false;

  logoOutFunction() {
    // this.logoutEvent.emit(event);
    console.log('LOGOUT');
  }

  navbarExpandsFunction() {
    this.isExpanded = !this.isExpanded;
  }
}
