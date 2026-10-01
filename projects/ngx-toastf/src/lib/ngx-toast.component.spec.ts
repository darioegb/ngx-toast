import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgxToastComponent } from './ngx-toast.component'
import { NgxToastType } from './ngx-toast-type.enum'
import { resolveToastConfig } from './ngx-toast-config.model'

describe('NgxToastComponent', () => {
  let fixture: ComponentFixture<NgxToastComponent>
  let component: NgxToastComponent

  afterEach(() => {
    vi.useRealTimers()
  })

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxToastComponent],
    })
    fixture = TestBed.createComponent(NgxToastComponent)
    component = fixture.componentInstance
  })

  function setConfig(
    overrides: Parameters<typeof resolveToastConfig>[2] = {},
  ): void {
    fixture.componentRef.setInput(
      'config',
      resolveToastConfig(
        NgxToastType.Success,
        {},
        { autoClose: false, ...overrides },
      ),
    )
    fixture.detectChanges()
  }

  function nativeElement(): HTMLElement {
    return fixture.nativeElement as HTMLElement
  }

  it('should create', () => {
    setConfig()
    expect(component).toBeTruthy()
  })

  it('should transition from opening to open after the first render', async () => {
    setConfig()
    expect(fixture.nativeElement.classList.contains('ngx-toast--opening')).toBe(
      true,
    )

    await fixture.whenStable()
    fixture.detectChanges()

    expect(fixture.nativeElement.classList.contains('ngx-toast--open')).toBe(
      true,
    )
    expect(fixture.nativeElement.classList.contains('ngx-toast--opening')).toBe(
      false,
    )
  })

  for (const type of [
    NgxToastType.Success,
    NgxToastType.Info,
    NgxToastType.Warning,
    NgxToastType.Error,
  ]) {
    it(`should apply the ${type} type class`, () => {
      fixture.componentRef.setInput(
        'config',
        resolveToastConfig(type, {}, { autoClose: false }),
      )
      fixture.detectChanges()
      expect(fixture.nativeElement.className).toContain(`ngx-toast--${type}`)
    })
  }

  it('should render the message', () => {
    fixture.componentRef.setInput('message', 'Hello world')
    setConfig()
    expect(fixture.nativeElement.textContent).toContain('Hello world')
  })

  it('should not render a header when there is no title', () => {
    setConfig()
    expect(fixture.nativeElement.querySelector('.ngx-toast__header')).toBeNull()
  })

  it('should render the title when provided', () => {
    fixture.componentRef.setInput('title', 'heads up')
    setConfig()
    expect(
      fixture.nativeElement.querySelector('.ngx-toast__title')?.textContent,
    ).toContain('Heads Up')
  })

  it('should not render a close button by default', () => {
    setConfig()
    expect(fixture.nativeElement.querySelector('.ngx-toast__close')).toBeNull()
  })

  it('should render and wire up the close button when enabled', () => {
    const closedSpy = vi.fn()
    component.closed.subscribe(closedSpy)
    setConfig({ closeButton: true, animationDuration: 0 })

    vi.useFakeTimers()
    nativeElement()
      .querySelector<HTMLButtonElement>('.ngx-toast__close')
      ?.click()
    vi.advanceTimersByTime(0)

    expect(closedSpy).toHaveBeenCalled()
  })

  it('should close on host click when tapDismiss is enabled', () => {
    const closedSpy = vi.fn()
    component.closed.subscribe(closedSpy)
    setConfig({ tapDismiss: true, animationDuration: 0 })

    vi.useFakeTimers()
    fixture.nativeElement.click()
    vi.advanceTimersByTime(0)

    expect(closedSpy).toHaveBeenCalled()
  })

  it('should not close on host click when tapDismiss is disabled', () => {
    const closedSpy = vi.fn()
    component.closed.subscribe(closedSpy)
    setConfig({ tapDismiss: false })

    fixture.nativeElement.click()

    expect(closedSpy).not.toHaveBeenCalled()
  })

  it('should auto close after the configured duration', () => {
    const closedSpy = vi.fn()
    component.closed.subscribe(closedSpy)
    vi.useFakeTimers()
    setConfig({ autoClose: true, duration: 1000, animationDuration: 0 })

    vi.advanceTimersByTime(1000)
    expect(closedSpy).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(closedSpy).toHaveBeenCalled()
  })

  it('should not auto close when disabled', () => {
    const closedSpy = vi.fn()
    component.closed.subscribe(closedSpy)
    vi.useFakeTimers()
    setConfig({ autoClose: false, duration: 10 })

    vi.advanceTimersByTime(1000)
    expect(closedSpy).not.toHaveBeenCalled()
  })
})
