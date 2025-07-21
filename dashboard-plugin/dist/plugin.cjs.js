'use strict';

var core = require('@capacitor/core');

const DashboardPlugin = core.registerPlugin('DashboardPlugin', {
    web: () => Promise.resolve().then(function () { return web; }).then((m) => new m.DashboardPluginWeb()),
});

class DashboardPluginWeb extends core.WebPlugin {
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

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DashboardPluginWeb: DashboardPluginWeb
});

exports.DashboardPlugin = DashboardPlugin;
//# sourceMappingURL=plugin.cjs.js.map
