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
    allowedRoleIds: [1, 2],
  },
  {
    menuIcon: 'ri-store-line',
    altText: 'businesses-icon',
    menuText: 'Business',
    baseUrl: '/businesses',
    allowedRoleIds: [1, 2],
  },
  {
    menuIcon: 'ri-apps-2-line',
    altText: 'classification-icon',
    menuText: 'Classification',
    baseUrl: '/classifications',
    allowedRoleIds: [1, 2, 3],
  },
  {
    menuIcon: 'ri-store-3-line',
    altText: 'orders-icon',
    menuText: 'Orders',
    baseUrl: '/orders',
    allowedRoleIds: [1, 2, 3],
  },
  {
    menuIcon: 'ri-truck-line',
    altText: 'delivery-icon',
    menuText: 'Delivery',
    baseUrl: '/branches',
    allowedRoleIds: [1, 2, 3],
  },
  {
    menuIcon: 'ri-line-chart-line',
    altText: 'analytics-icon',
    menuText: 'Analytics',
    baseUrl: '/analytics',
    allowedRoleIds: [1, 2, 3],
  },
];

export const logOutConfig: LogOutConfig = {
  logOutIcon: 'ri-logout-box-line',
  logOutTitle: 'Log out',
};

export const headerBrand: HeaderBrand = {
  expandedBrandSrc: 'assets/images/state-management-expanded.png',
  collapsedBrandSrc: 'assets/images/logo-Applaudo-red.png',
};
