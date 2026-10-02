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
    role: 'status',
    '[attr.aria-live]': "'polite'",
    '[class]': 'hostClasses()',
    '[style.transitionDuration.ms]': 'config().animationDuration',
    '(click)': 'dismissOnTap()',
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

  protected readonly hostClasses = computed(
    () =>
      `ngx-toast ${NGX_TOAST_TYPE_CLASS[this.config().type]} ngx-toast--${this.state()}`,
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
      if (!cfg.autoClose) {
        return
      }
      const timer = setTimeout(() => this.requestClose(), cfg.duration)
      onCleanup(() => clearTimeout(timer))
    })
  }

  protected requestClose(): void {
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

  protected dismissOnTap(): void {
    if (this.config().tapDismiss) {
      this.requestClose()
    }
  }
}
