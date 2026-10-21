import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  OnDestroy,
  createComponent,
  inject,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { NgxToastComponent } from './ngx-toast.component'
import { NgxToastAnnouncer } from './ngx-toast-announcer.service'
import { NgxToastType } from './ngx-toast-type.enum'
import { NgxToastPosition } from './ngx-toast-position.enum'
import {
  NgxToastConfig,
  ResolvedNgxToastConfig,
  resolveToastConfig,
} from './ngx-toast-config.model'
import { NGX_TOAST_STACK_POSITION_STYLE } from './ngx-toast-constant'
import { NGX_TOAST_CONFIG } from './ngx-toast.token'

@Injectable({
  providedIn: 'root',
})
export class NgxToastService implements OnDestroy {
  private readonly appRef = inject(ApplicationRef)
  private readonly environmentInjector = inject(EnvironmentInjector)
  private readonly document = inject(DOCUMENT)
  private readonly defaultConfig = inject(NGX_TOAST_CONFIG)
  private readonly announcer = inject(NgxToastAnnouncer)

  private readonly stacks = new Map<NgxToastPosition, HTMLElement>()
  /** Visible toasts, oldest first, so Escape can dismiss the most recent one. */
  private readonly openToasts: NgxToastComponent[] = []

  private readonly onKeydown = (event: KeyboardEvent): void => {
    if (event.key !== 'Escape' || event.defaultPrevented) {
      return
    }
    const toast = [...this.openToasts].reverse().find((t) => !t.isClosing())
    toast?.requestClose()
  }

  ngOnDestroy(): void {
    this.document.removeEventListener('keydown', this.onKeydown)
  }

  show(type: NgxToastType, message: string, config?: NgxToastConfig): void {
    this.createToast(type, message, config)
  }

  showToastSuccess(message: string, config?: NgxToastConfig): void {
    this.createToast(NgxToastType.Success, message, config)
  }

  showToastInfo(message: string, config?: NgxToastConfig): void {
    this.createToast(NgxToastType.Info, message, config)
  }

  showToastWarning(message: string, config?: NgxToastConfig): void {
    this.createToast(NgxToastType.Warning, message, config)
  }

  showToastError(message: string, config?: NgxToastConfig): void {
    this.createToast(NgxToastType.Error, message, config)
  }

  private createToast(
    type: NgxToastType,
    message: string,
    config?: NgxToastConfig,
  ): void {
    const resolved = resolveToastConfig(type, this.defaultConfig, config)
    const stack = this.getStack(resolved.position)
    const host = this.document.createElement('div')
    stack.appendChild(host)

    const toastRef = createComponent(NgxToastComponent, {
      environmentInjector: this.environmentInjector,
      hostElement: host,
    })
    toastRef.setInput('message', message)
    toastRef.setInput('title', resolved.title)
    toastRef.setInput('config', resolved)
    this.appRef.attachView(toastRef.hostView)
    // Render synchronously so the DOM reflects the toast as soon as showX() returns.
    toastRef.changeDetectorRef.detectChanges()

    if (this.openToasts.length === 0) {
      this.document.addEventListener('keydown', this.onKeydown)
    }
    this.openToasts.push(toastRef.instance)
    this.announcer.announce(
      this.announcement(resolved.type, message, resolved),
      resolved.type === NgxToastType.Error ? 'assertive' : 'polite',
    )

    toastRef.instance.closed.subscribe(() => {
      this.openToasts.splice(this.openToasts.indexOf(toastRef.instance), 1)
      if (this.openToasts.length === 0) {
        this.document.removeEventListener('keydown', this.onKeydown)
      }
      this.appRef.detachView(toastRef.hostView)
      toastRef.destroy()
      host.remove()
      if (stack.childElementCount === 0) {
        stack.remove()
        this.stacks.delete(resolved.position)
      }
    })
  }

  private announcement(
    type: NgxToastType,
    message: string,
    config: ResolvedNgxToastConfig,
  ): string {
    const title = config.title ? `${config.title}. ` : ''
    return `${config.typeLabels[type]}: ${title}${message}`
  }

  private getStack(position: NgxToastPosition): HTMLElement {
    const existing = this.stacks.get(position)
    if (existing) {
      return existing
    }
    const stack = this.document.createElement('div')
    stack.classList.add('ngx-toast-stack')
    Object.assign(stack.style, {
      position: 'fixed',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      zIndex: '1000',
      ...NGX_TOAST_STACK_POSITION_STYLE[position],
    })
    this.document.body.appendChild(stack)
    this.stacks.set(position, stack)
    return stack
  }
}
