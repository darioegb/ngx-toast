import { NgxToastPosition } from './ngx-toast-position.enum'
import { NgxToastType } from './ngx-toast-type.enum'

export interface NgxToastConfig {
  title?: string
  position?: NgxToastPosition
  duration?: number
  closeButton?: boolean
  showIcon?: boolean
  tapDismiss?: boolean
  autoClose?: boolean
  animationDuration?: number
}

export type ResolvedNgxToastConfig = Required<NgxToastConfig> & {
  type: NgxToastType
}

export const DEFAULT_NGX_TOAST_CONFIG: Required<NgxToastConfig> = {
  title: '',
  position: NgxToastPosition.TopRight,
  duration: 3000,
  closeButton: false,
  showIcon: true,
  tapDismiss: false,
  autoClose: true,
  animationDuration: 200,
}

export function resolveToastConfig(
  type: NgxToastType,
  base: NgxToastConfig,
  overrides: NgxToastConfig = {},
): ResolvedNgxToastConfig {
  return { ...DEFAULT_NGX_TOAST_CONFIG, ...base, ...overrides, type }
}
