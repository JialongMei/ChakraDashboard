"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    appId: 'com.example.app',
    appName: 'Chakra Dashboard',
    webDir: 'build',
    server: {
        androidScheme: 'http',
        cleartext: true,
    },
    android: {
        allowMixedContent: true
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 3000,
            launchAutoHide: true,
            launchFadeOutDuration: 1000,
            backgroundColor: "#ffffffff",
            androidSplashResourceName: "splash",
            androidScaleType: "CENTER_CROP",
            showSpinner: true,
            androidSpinnerStyle: "large",
            iosSpinnerStyle: "small",
            spinnerColor: "#999999",
            splashFullScreen: true,
            splashImmersive: true,
            layoutName: "launch_screen",
            useDialog: true,
        },
        CapacitorHttp: {
            enabled: true
        },
    },
};
exports.default = config;
