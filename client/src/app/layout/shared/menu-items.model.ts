import {MenuItem} from "./menu-item.model";

export const MENU_ITEMS: MenuItem[] = [
  new MenuItem('Home', 'home', 'HOME.MENU.MENU_ITEM.HOME'),
  new MenuItem('Activity History', 'activities/consent-activity', 'HOME.MENU.MENU_ITEM.ACTIVITY_HISTORY'),
  new MenuItem('Providers', 'providers', 'HOME.MENU.MENU_ITEM.PROVIDERS'),
  new MenuItem('Consents', 'consents', 'HOME.MENU.MENU_ITEM.CONSENTS'),
  new MenuItem('Medical Documents', 'medical-documents', 'HOME.MENU.MENU_ITEM.MEDICAL_DOCUMENTS'),
  new MenuItem('Health Information', 'health-information', 'HOME.MENU.MENU_ITEM.HEALTH_INFORMATION'),
  new MenuItem('My Profile', 'user-profile', 'HOME.MENU.MENU_ITEM.MY_PROFILE'),
  new MenuItem('Logout', '', 'HOME.MENU.MENU_ITEM.LOGOUT')
];
