import { InjectionToken } from '@angular/core'
import { NgxToastConfig } from './ngx-toast-config.model'

// Global default overrides merged under each showX() call's per-call config.
export const NGX_TOAST_CONFIG = new InjectionToken<NgxToastConfig>(
  'NGX_TOAST_CONFIG',
  {
    providedIn: 'root',
    factory: () => ({}),
  },
)
