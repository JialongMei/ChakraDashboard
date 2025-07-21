import { WebPlugin } from '@capacitor/core';
export class DashboardPluginWeb extends WebPlugin {
    async enableListening() {
        console.warn('Shake detection is not available on web platform');
        return Promise.resolve();
    }
    async stopListening() {
        console.warn('Shake detection is not available on web platform');
        return Promise.resolve();
    }
    async removeAllListeners() {
        console.warn('Shake detection is not available on web platform');
        return Promise.resolve();
    }
    async isListening() {
        console.warn('Shake detection is not available on web platform');
        return Promise.resolve({ isListening: false });
    }
}
//# sourceMappingURL=web.js.map