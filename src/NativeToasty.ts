import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface ToastOptions {
  title: string;
  position?: string;
  duration?: number;
  tintColor?: string;
  textColor?: string;
  withIcon?: boolean;
}

export interface Spec extends TurboModule {
  show(options: ToastOptions): void;
  normal(options: ToastOptions): void;
  info(options: ToastOptions): void;
  success(options: ToastOptions): void;
  warn(options: ToastOptions): void;
  error(options: ToastOptions): void;
}

export default TurboModuleRegistry.getEnforcing<Spec>('NativeToasty');
