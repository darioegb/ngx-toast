import {
  DEFAULT_NGX_TOAST_CONFIG,
  NgxToastConfig,
  NgxToastPosition,
  NgxToastType,
} from 'ngx-toastf'

export const SETUP_SNIPPET = `import { ApplicationConfig } from '@angular/core'
import { provideNgxToast, withToastConfig } from 'ngx-toastf'

export const appConfig: ApplicationConfig = {
  providers: [
    // optional: global defaults for every toast
    provideNgxToast(withToastConfig({ closeButton: true })),
  ],
}`

const METHOD_BY_TYPE: Record<NgxToastType, string> = {
  [NgxToastType.Success]: 'showToastSuccess',
  [NgxToastType.Info]: 'showToastInfo',
  [NgxToastType.Warning]: 'showToastWarning',
  [NgxToastType.Error]: 'showToastError',
}

const POSITION_KEY_BY_VALUE = Object.fromEntries(
  Object.entries(NgxToastPosition).map(([key, value]) => [value, key]),
)

function quote(value: string): string {
  return `'${value.replaceAll('\\', '\\\\').replaceAll("'", String.raw`\'`)}'`
}

function formatOption(key: keyof NgxToastConfig, value: unknown): string {
  if (key === 'position') {
    return `position: NgxToastPosition.${POSITION_KEY_BY_VALUE[value as string]}`
  }
  return `${key}: ${typeof value === 'string' ? quote(value) : value}`
}

/** Builds a usage snippet that only lists the options that differ from the library defaults. */
export function buildUsageSnippet(
  type: NgxToastType,
  message: string,
  config: NgxToastConfig,
): string {
  const options = (Object.keys(config) as (keyof NgxToastConfig)[])
    .filter(
      (key) =>
        config[key] !== undefined &&
        config[key] !== DEFAULT_NGX_TOAST_CONFIG[key],
    )
    .map((key) => formatOption(key, config[key]))

  const usesPosition = options.some((option) => option.startsWith('position:'))
  const imports = usesPosition
    ? 'NgxToastPosition, NgxToastService'
    : 'NgxToastService'
  const call = `this.toastService.${METHOD_BY_TYPE[type]}(${quote(message)}`
  const body = options.length
    ? `${call}, {\n      ${options.join(',\n      ')},\n    })`
    : `${call})`

  return `import { Component, inject } from '@angular/core'
import { ${imports} } from 'ngx-toastf'

@Component({ /* ... */ })
export class MyComponent {
  private readonly toastService = inject(NgxToastService)

  notify(): void {
    ${body}
  }
}`
}
