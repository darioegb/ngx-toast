import { ApplicationConfig } from '@angular/core'
import { provideRouter } from '@angular/router'
import { provideNgxToast, withToastConfig } from 'ngx-toastf'
import { routes } from './app.routes'

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideNgxToast(withToastConfig({ closeButton: true })),
  ],
}
