export interface DashboardPluginPlugin {
    enableListening(): Promise<void>;
    stopListening(): Promise<void>;
    removeAllListeners(): Promise<void>;
    isListening(): Promise<{
        isListening: boolean;
    }>;
    addListener(eventName: 'shake', listenerFunc: (data: ShakeEvent) => void): Promise<PluginListenerHandle>;
}
export interface ShakeEvent {
    type: 'shake';
    timestamp: number;
}
export interface PluginListenerHandle {
    remove(): Promise<void>;
}
