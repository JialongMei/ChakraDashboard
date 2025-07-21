import { registerPlugin } from '@capacitor/core';
const DashboardPlugin = registerPlugin('DashboardPlugin', {
    web: () => import('./web').then((m) => new m.DashboardPluginWeb()),
});
export * from './definitions';
export { DashboardPlugin };
//# sourceMappingURL=index.js.map