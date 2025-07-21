import { WebPlugin } from '@capacitor/core';
import type { DashboardPluginPlugin } from './definitions';

export class DashboardPluginWeb extends WebPlugin implements DashboardPluginPlugin {
  async enableListening(): Promise<void> {
    console.warn('Shake detection is not available on web platform');
    return Promise.resolve();
  }

  async stopListening(): Promise<void> {
    console.warn('Shake detection is not available on web platform');
    return Promise.resolve();
  }

  async removeAllListeners(): Promise<void> {
    console.warn('Shake detection is not available on web platform');
    return Promise.resolve();
  }

  async isListening(): Promise<{ isListening: boolean }> {
    console.warn('Shake detection is not available on web platform');
    return Promise.resolve({ isListening: false });
  }
}