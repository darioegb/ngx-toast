import { ModuleWithProviders, NgModule } from '@angular/core'
import { NgxToastConfig } from './ngx-toast-config.model'
import { provideNgxToast, withToastConfig } from './provide-ngx-toast'

/**
 * @deprecated Use `provideNgxToast()` instead. Will be removed in a future major version.
 */
@NgModule({})
export class NgxToastModule {
  static forRoot(config?: NgxToastConfig): ModuleWithProviders<NgxToastModule> {
    return {
      ngModule: NgxToastModule,
      providers: config
        ? provideNgxToast(withToastConfig(config))
        : provideNgxToast(),
    }
  }
}
