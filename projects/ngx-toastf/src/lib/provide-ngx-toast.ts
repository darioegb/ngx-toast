import { Provider } from '@angular/core'
import { NgxToastConfig } from './ngx-toast-config.model'
import { NGX_TOAST_CONFIG } from './ngx-toast.token'

/**
 * Optional - `NgxToastService` works with zero setup. Use this only to override the
 * global defaults, composing features like `provideHttpClient(withXhr(), ...)`:
 * `provideNgxToast(withToastConfig({...}))`.
 */
export function provideNgxToast(...features: Provider[][]): Provider[] {
  return [...features.flat()]
}

export function withToastConfig(config: NgxToastConfig): Provider[] {
  return [{ provide: NGX_TOAST_CONFIG, useValue: config }]
}
