import { registerPlugin } from '@capacitor/core';
import type { DashboardPluginPlugin } from './definitions';

const DashboardPlugin = registerPlugin<DashboardPluginPlugin>('DashboardPlugin', {
  web: () => import('./web').then((m) => new m.DashboardPluginWeb()),
});

export * from './definitions';
export { DashboardPlugin };