import NativeToasty from './NativeToasty';
import { type ToastOptions } from './types';

const DEFAULT_OPTIONS: Partial<ToastOptions> = {
  position: 'bottom',
  duration: 3000,
  withIcon: true,
};

const RNNativeToasty = {
  /**
   * Show a normal toast
   */
  Normal(options: Partial<ToastOptions>): void {
    NativeToasty.normal({
      ...DEFAULT_OPTIONS,
      ...options,
    } as ToastOptions);
  },

  /**
   * Show an info toast
   */
  Info(options: Partial<ToastOptions>): void {
    NativeToasty.info({
      ...DEFAULT_OPTIONS,
      ...options,
    } as ToastOptions);
  },

  /**
   * Show a success toast
   */
  Success(options: Partial<ToastOptions>): void {
    NativeToasty.success({
      ...DEFAULT_OPTIONS,
      ...options,
    } as ToastOptions);
  },

  /**
   * Show a warning toast
   */
  Warn(options: Partial<ToastOptions>): void {
    NativeToasty.warn({
      ...DEFAULT_OPTIONS,
      ...options,
    } as ToastOptions);
  },

  /**
   * Show an error toast
   */
  Error(options: Partial<ToastOptions>): void {
    NativeToasty.error({
      ...DEFAULT_OPTIONS,
      ...options,
    } as ToastOptions);
  },

  /**
   * Show a custom toast
   */
  Show(options: Partial<ToastOptions>): void {
    NativeToasty.show({
      ...DEFAULT_OPTIONS,
      ...options,
    } as ToastOptions);
  },
};

export default RNNativeToasty;
