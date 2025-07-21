import { WebPlugin } from '@capacitor/core';
import type { SimpleTestPlugin } from './definitions';

export class SimpleTestWeb extends WebPlugin implements SimpleTestPlugin {
  async hello(options: { name: string }): Promise<{ message: string }> {
    return { message: `Hello ${options.name} from web!` };
  }
}