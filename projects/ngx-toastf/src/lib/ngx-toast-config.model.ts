import { NgxToastPosition } from './ngx-toast-position.enum'
import { NgxToastType } from './ngx-toast-type.enum'
import { NGX_TOAST_DEFAULT_TYPE_LABELS } from './ngx-toast-constant'

export interface NgxToastConfig {
  title?: string
  position?: NgxToastPosition
  duration?: number
  closeButton?: boolean
  showIcon?: boolean
  tapDismiss?: boolean
  autoClose?: boolean
  animationDuration?: number
  /** Pause the auto-close timer while the toast is hovered or has keyboard focus. */
  pauseOnHover?: boolean
  /** Accessible name of the close button. */
  closeButtonLabel?: string
  /** Text announced before the message, per type. Only the types you pass are overridden. */
  typeLabels?: Partial<Record<NgxToastType, string>>
}

export type ResolvedNgxToastConfig = Omit<
  Required<NgxToastConfig>,
  'typeLabels'
> & {
  type: NgxToastType
  typeLabels: Record<NgxToastType, string>
}

export const DEFAULT_NGX_TOAST_CONFIG: Omit<
  Required<NgxToastConfig>,
  'typeLabels'
> & { typeLabels: Record<NgxToastType, string> } = {
  title: '',
  position: NgxToastPosition.TopRight,
  duration: 3000,
  closeButton: false,
  showIcon: true,
  tapDismiss: false,
  autoClose: true,
  animationDuration: 200,
  pauseOnHover: true,
  closeButtonLabel: 'Close',
  typeLabels: NGX_TOAST_DEFAULT_TYPE_LABELS,
}

export function resolveToastConfig(
  type: NgxToastType,
  base: NgxToastConfig,
  overrides: NgxToastConfig = {},
): ResolvedNgxToastConfig {
  return {
    ...DEFAULT_NGX_TOAST_CONFIG,
    ...base,
    ...overrides,
    type,
    typeLabels: {
      ...DEFAULT_NGX_TOAST_CONFIG.typeLabels,
      ...base.typeLabels,
      ...overrides.typeLabels,
    },
  }
}
