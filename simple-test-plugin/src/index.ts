import { registerPlugin } from '@capacitor/core';
import type { SimpleTestPlugin } from './definitions';

const SimpleTest = registerPlugin<SimpleTestPlugin>('SimpleTest');

export * from './definitions';
export { SimpleTest };