import { NgxToastPosition } from './ngx-toast-position.enum'
import { NgxToastType } from './ngx-toast-type.enum'

export type NgxToastState = 'opening' | 'open' | 'closing'

export const NGX_TOAST_TYPE_CLASS: Record<NgxToastType, string> = {
  [NgxToastType.Success]: 'ngx-toast--success',
  [NgxToastType.Info]: 'ngx-toast--info',
  [NgxToastType.Warning]: 'ngx-toast--warning',
  [NgxToastType.Error]: 'ngx-toast--error',
}

// Inline since the stack element lives outside Angular's view (appended to <body>), not scoped CSS.
export const NGX_TOAST_STACK_POSITION_STYLE: Record<
  NgxToastPosition,
  Partial<CSSStyleDeclaration>
> = {
  [NgxToastPosition.TopLeft]: { top: '0', left: '0', alignItems: 'flex-start' },
  [NgxToastPosition.TopRight]: { top: '0', right: '0', alignItems: 'flex-end' },
  [NgxToastPosition.TopCenter]: {
    top: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    alignItems: 'center',
  },
  [NgxToastPosition.TopFullWidth]: {
    top: '0',
    left: '0',
    right: '0',
    alignItems: 'stretch',
  },
  [NgxToastPosition.BottomLeft]: {
    bottom: '0',
    left: '0',
    alignItems: 'flex-start',
    flexDirection: 'column-reverse',
  },
  [NgxToastPosition.BottomRight]: {
    bottom: '0',
    right: '0',
    alignItems: 'flex-end',
    flexDirection: 'column-reverse',
  },
  [NgxToastPosition.BottomCenter]: {
    bottom: '0',
    left: '50%',
    transform: 'translateX(-50%)',
    alignItems: 'center',
    flexDirection: 'column-reverse',
  },
  [NgxToastPosition.BottomFullWidth]: {
    bottom: '0',
    left: '0',
    right: '0',
    alignItems: 'stretch',
    flexDirection: 'column-reverse',
  },
  [NgxToastPosition.Center]: {
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: 'center',
  },
}
