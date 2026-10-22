import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core'
import { NgTemplateOutlet, TitleCasePipe } from '@angular/common'
import { ResolvedNgxToastConfig } from './ngx-toast-config.model'
import { NgxToastType } from './ngx-toast-type.enum'
import { NGX_TOAST_TYPE_CLASS, NgxToastState } from './ngx-toast-constant'

@Component({
  selector: 'ngx-toast',
  imports: [NgTemplateOutlet, TitleCasePipe],
  templateUrl: './ngx-toast.component.html',
  styleUrl: './ngx-toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'hostClasses()',
    '[style.transitionDuration.ms]': 'config().animationDuration',
    '(click)': 'dismissOnTap()',
    '(mouseenter)': 'onHoverChange(true)',
    '(mouseleave)': 'onHoverChange(false)',
    '(focusin)': 'onFocusChange(true)',
    '(focusout)': 'onFocusOut($event)',
  },
})
export class NgxToastComponent {
  protected readonly NgxToastType = NgxToastType

  readonly message = input('')
  readonly title = input('')
  readonly config = input.required<ResolvedNgxToastConfig>()

  readonly closed = output<void>()

  private readonly destroyRef = inject(DestroyRef)
  private readonly state = signal<NgxToastState>('opening')

  private autoCloseTimer: ReturnType<typeof setTimeout> | undefined
  private autoCloseStartedAt = 0
  private autoCloseRemaining = 0
  private hovered = false
  private focused = false

  protected readonly hostClasses = computed(
    () =>
      `ngx-toast ${NGX_TOAST_TYPE_CLASS[this.config().type]} ngx-toast--${this.state()}`,
  )

  protected readonly typeLabel = computed(
    () => this.config().typeLabels[this.config().type],
  )

  /** Without a title there is no heading to carry the icon, so it goes next to the message. */
  protected readonly showBodyIcon = computed(
    () => this.config().showIcon && !this.title(),
  )

  /** Without a title there is no header row, so the icon and close button share the message row. */
  protected readonly inlineBody = computed(
    () =>
      !this.title() && (this.config().showIcon || this.config().closeButton),
  )

  constructor() {
    // Start in the 'opening' state for one frame so the CSS transition to 'open' animates in.
    afterNextRender(() => {
      this.state.set('open')
    })

    // Reacts only to config (not state), so closing stays a deterministic, immediate setTimeout.
    effect((onCleanup) => {
      const cfg = this.config()
      if (cfg.autoClose) {
        this.startAutoCloseTimer(cfg.duration)
      }
      onCleanup(() => this.stopAutoCloseTimer())
    })
  }

  /** Starts the close animation, after which `closed` is emitted. */
  requestClose(): void {
    if (this.state() === 'closing') {
      return
    }
    this.state.set('closing')
    const timer = setTimeout(
      () => this.closed.emit(),
      this.config().animationDuration,
    )
    this.destroyRef.onDestroy(() => clearTimeout(timer))
  }

  isClosing(): boolean {
    return this.state() === 'closing'
  }

  protected onHoverChange(hovered: boolean): void {
    this.hovered = hovered
    this.syncAutoCloseTimer()
  }

  protected onFocusChange(focused: boolean): void {
    this.focused = focused
    this.syncAutoCloseTimer()
  }

  protected onFocusOut(event: FocusEvent): void {
    const host = event.currentTarget as HTMLElement
    // Focus moving between elements inside the toast (e.g. onto the close button) is not leaving it.
    if (!host.contains(event.relatedTarget as Node | null)) {
      this.onFocusChange(false)
    }
  }

  protected dismissOnTap(): void {
    if (this.config().tapDismiss) {
      this.requestClose()
    }
  }

  /** Pauses the countdown while hovered/focused (WCAG 2.2.1), resuming with the time left. */
  private syncAutoCloseTimer(): void {
    const cfg = this.config()
    if (!cfg.autoClose || !cfg.pauseOnHover || this.isClosing()) {
      return
    }
    if (this.hovered || this.focused) {
      if (this.autoCloseTimer !== undefined) {
        this.autoCloseRemaining -= Date.now() - this.autoCloseStartedAt
        this.stopAutoCloseTimer()
      }
    } else if (this.autoCloseTimer === undefined) {
      this.startAutoCloseTimer(this.autoCloseRemaining)
    }
  }

  private startAutoCloseTimer(ms: number): void {
    this.autoCloseRemaining = ms
    this.autoCloseStartedAt = Date.now()
    this.autoCloseTimer = setTimeout(() => this.requestClose(), ms)
  }

  private stopAutoCloseTimer(): void {
    clearTimeout(this.autoCloseTimer)
    this.autoCloseTimer = undefined
  }
}
