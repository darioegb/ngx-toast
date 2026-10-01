import {
  ApplicationRef,
  EnvironmentInjector,
  Injectable,
  createComponent,
  inject,
} from '@angular/core'
import { DOCUMENT } from '@angular/common'
import { NgxToastComponent } from './ngx-toast.component'
import { NgxToastType } from './ngx-toast-type.enum'
import { NgxToastPosition } from './ngx-toast-position.enum'
import { NgxToastConfig, resolveToastConfig } from './ngx-toast-config.model'
import { NGX_TOAST_STACK_POSITION_STYLE } from './ngx-toast-constant'
import { NGX_TOAST_CONFIG } from './ngx-toast.token'

@Injectable({
  providedIn: 'root',
})
export class NgxToastService {
  private readonly appRef = inject(ApplicationRef)
  private readonly environmentInjector = inject(EnvironmentInjector)
  private readonly document = inject(DOCUMENT)
  private readonly defaultConfig = inject(NGX_TOAST_CONFIG)

  private readonly stacks = new Map<NgxToastPosition, HTMLElement>()

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

    toastRef.instance.closed.subscribe(() => {
      this.appRef.detachView(toastRef.hostView)
      toastRef.destroy()
      host.remove()
      if (stack.childElementCount === 0) {
        stack.remove()
        this.stacks.delete(resolved.position)
      }
    })
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
