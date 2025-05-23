export interface ToastOptions {
  position?: 'top' | 'center' | 'bottom';
  duration?: number;
  fontFamily?: string;
  title: string;
  tintColor?: string;
  textColor?: string;
  withIcon?: boolean;
}

export type ToastType =
  | 'normal'
  | 'info'
  | 'success'
  | 'warn'
  | 'error'
  | 'custom';
