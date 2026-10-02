import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { FormsModule } from '@angular/forms'
import {
  DEFAULT_NGX_TOAST_CONFIG,
  NgxToastConfig,
  NgxToastPosition,
  NgxToastService,
  NgxToastType,
} from 'ngx-toastf'
import { SETUP_SNIPPET, buildUsageSnippet } from './code-snippet'
import { reportHeightToParent } from './embed-height'
import { ThemeService } from './theme.service'

type SnippetTab = 'usage' | 'setup'

interface ToastTrigger {
  type: NgxToastType
  label: string
  buttonClass: string
}

const COPIED_FEEDBACK_MS = 1500

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly toastService = inject(NgxToastService)
  private readonly document = inject(DOCUMENT)

  private readonly themeService = inject(ThemeService)

  protected readonly embedded = this.themeService.embedded
  protected readonly theme = this.themeService.theme

  protected readonly links = {
    docs: 'https://darioegb.github.io/ngx-toast/',
    github: 'https://github.com/darioegb/ngx-toast',
    npm: 'https://www.npmjs.com/package/ngx-toastf',
  }

  /** Grid rows of the position picker, mirroring where the toasts show up on screen. */
  protected readonly positionRows: readonly (readonly NgxToastPosition[])[] = [
    [
      NgxToastPosition.TopLeft,
      NgxToastPosition.TopCenter,
      NgxToastPosition.TopRight,
    ],
    [NgxToastPosition.TopFullWidth],
    [NgxToastPosition.Center],
    [NgxToastPosition.BottomFullWidth],
    [
      NgxToastPosition.BottomLeft,
      NgxToastPosition.BottomCenter,
      NgxToastPosition.BottomRight,
    ],
  ]

  protected readonly triggers: readonly ToastTrigger[] = [
    {
      type: NgxToastType.Success,
      label: 'Success',
      buttonClass: 'btn-success',
    },
    { type: NgxToastType.Info, label: 'Info', buttonClass: 'btn-info' },
    {
      type: NgxToastType.Warning,
      label: 'Warning',
      buttonClass: 'btn-warning',
    },
    { type: NgxToastType.Error, label: 'Error', buttonClass: 'btn-danger' },
  ]

  protected readonly message = signal('Changes saved successfully')
  protected readonly title = signal('Done')
  protected readonly position = signal(DEFAULT_NGX_TOAST_CONFIG.position)
  protected readonly duration = signal(DEFAULT_NGX_TOAST_CONFIG.duration)
  protected readonly animationDuration = signal(
    DEFAULT_NGX_TOAST_CONFIG.animationDuration,
  )
  protected readonly closeButton = signal(true)
  protected readonly showIcon = signal(DEFAULT_NGX_TOAST_CONFIG.showIcon)
  protected readonly tapDismiss = signal(DEFAULT_NGX_TOAST_CONFIG.tapDismiss)
  protected readonly autoClose = signal(DEFAULT_NGX_TOAST_CONFIG.autoClose)

  protected readonly activeTab = signal<SnippetTab>('usage')
  protected readonly lastType = signal(NgxToastType.Success)
  protected readonly copied = signal(false)

  private readonly config = computed<NgxToastConfig>(() => ({
    title: this.title(),
    position: this.position(),
    duration: this.duration(),
    animationDuration: this.animationDuration(),
    closeButton: this.closeButton(),
    showIcon: this.showIcon(),
    tapDismiss: this.tapDismiss(),
    autoClose: this.autoClose(),
  }))

  protected readonly snippet = computed(() =>
    this.activeTab() === 'setup'
      ? SETUP_SNIPPET
      : buildUsageSnippet(this.lastType(), this.message(), this.config()),
  )

  protected toggleTheme(): void {
    this.themeService.toggle()
  }

  constructor() {
    if (this.embedded) {
      inject(DestroyRef).onDestroy(reportHeightToParent(this.document))
    }
  }

  protected positionLabel(position: NgxToastPosition): string {
    return position.replaceAll('-', ' ')
  }

  protected show(type: NgxToastType): void {
    this.lastType.set(type)
    this.activeTab.set('usage')
    const config = this.config()
    switch (type) {
      case NgxToastType.Success:
        this.toastService.showToastSuccess(this.message(), config)
        break
      case NgxToastType.Info:
        this.toastService.showToastInfo(this.message(), config)
        break
      case NgxToastType.Warning:
        this.toastService.showToastWarning(this.message(), config)
        break
      case NgxToastType.Error:
        this.toastService.showToastError(this.message(), config)
        break
    }
  }

  protected async copySnippet(): Promise<void> {
    try {
      await this.document.defaultView?.navigator.clipboard.writeText(
        this.snippet(),
      )
    } catch {
      return
    }
    this.copied.set(true)
    setTimeout(() => this.copied.set(false), COPIED_FEEDBACK_MS)
  }
}
