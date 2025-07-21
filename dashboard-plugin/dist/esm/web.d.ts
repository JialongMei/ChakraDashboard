import { WebPlugin } from '@capacitor/core';
import type { DashboardPluginPlugin } from './definitions';
export declare class DashboardPluginWeb extends WebPlugin implements DashboardPluginPlugin {
    enableListening(): Promise<void>;
    stopListening(): Promise<void>;
    removeAllListeners(): Promise<void>;
    isListening(): Promise<{
        isListening: boolean;
    }>;
}
