import {
  HeaderBrand,
  LogOutConfig,
  NavigationItem,
} from '@clapp1/clapp-angular';

export const navigationOptions: NavigationItem[] = [
  {
    menuIcon: 'ri-apps-line',
    altText: 'customer-icon',
    menuText: 'Customer',
    baseUrl: '/customers',
    allowedRoleIds: [],
  },
  {
    menuIcon: 'ri-store-line',
    altText: 'businesses-icon',
    menuText: 'Business',
    baseUrl: '/businesses',
    allowedRoleIds: [],
  },
  {
    menuIcon: 'ri-apps-2-line',
    altText: 'classification-icon',
    menuText: 'Classification',
    baseUrl: '/classifications',
    allowedRoleIds: [],
  },
  {
    menuIcon: 'ri-store-3-line',
    altText: 'orders-icon',
    menuText: 'Orders',
    baseUrl: '/orders',
    allowedRoleIds: [],
  },
  {
    menuIcon: 'ri-truck-line',
    altText: 'delivery-icon',
    menuText: 'Delivery',
    baseUrl: '/branches',
    allowedRoleIds: [3],
  },
  {
    menuIcon: 'ri-line-chart-line',
    altText: 'analytics-icon',
    menuText: 'Analytics',
    baseUrl: '/analytics',
    allowedRoleIds: [],
  },
];

export const logOutConfig: LogOutConfig = {
  logOutIcon: 'ri-logout-box-line',
  logOutTitle: 'Log out',
};

export const headerBrand: HeaderBrand = {
  expandedBrandSrc: 'assets/images/mock-logo-app-expanded.png',
  collapsedBrandSrc: 'assets/images/logo-applaudo-red.png',
};
