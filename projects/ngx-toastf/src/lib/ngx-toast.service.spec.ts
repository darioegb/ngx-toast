import { TestBed } from '@angular/core/testing'
import { NgxToastService } from './ngx-toast.service'
import { NgxToastType } from './ngx-toast-type.enum'
import { NgxToastPosition } from './ngx-toast-position.enum'
import { provideNgxToast, withToastConfig } from './provide-ngx-toast'

describe('NgxToastService', () => {
  let service: NgxToastService

  afterEach(() => {
    document
      .querySelectorAll('.ngx-toast-stack')
      .forEach((stack) => stack.remove())
  })

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(NgxToastService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  for (const [method, type] of [
    ['showToastSuccess', NgxToastType.Success],
    ['showToastInfo', NgxToastType.Info],
    ['showToastWarning', NgxToastType.Warning],
    ['showToastError', NgxToastType.Error],
  ] as const) {
    it(`${method}() should render a ${type} toast`, () => {
      ;(service[method] as (message: string, config?: object) => void)(
        'hello',
        { autoClose: false },
      )
      const toast = document.querySelector(`.ngx-toast--${type}`)
      expect(toast?.textContent).toContain('hello')
    })
  }

  it('show() should render a toast of the given type', () => {
    service.show(NgxToastType.Warning, 'careful', { autoClose: false })
    expect(
      document.querySelector('.ngx-toast--warning')?.textContent,
    ).toContain('careful')
  })

  it('should stack multiple toasts in the same position', () => {
    service.showToastSuccess('first', {
      animationDuration: 0,
      autoClose: false,
    })
    service.showToastSuccess('second', {
      animationDuration: 0,
      autoClose: false,
    })
    const stack = document.querySelector('.ngx-toast-stack')
    expect(stack?.childElementCount).toBe(2)
  })

  it('should use separate stacks per position', () => {
    service.showToastSuccess('top', {
      position: NgxToastPosition.TopRight,
      autoClose: false,
    })
    service.showToastSuccess('bottom', {
      position: NgxToastPosition.BottomLeft,
      autoClose: false,
    })
    expect(document.querySelectorAll('.ngx-toast-stack').length).toBe(2)
  })

  it('should remove the toast and its stack once closed', () => {
    vi.useFakeTimers()
    service.showToastSuccess('bye', {
      closeButton: true,
      animationDuration: 0,
      autoClose: false,
    })
    const closeButton =
      document.querySelector<HTMLButtonElement>('.ngx-toast__close')

    closeButton?.click()
    vi.advanceTimersByTime(0)
    vi.useRealTimers()

    expect(document.querySelector('.ngx-toast--success')).toBeNull()
    expect(document.querySelector('.ngx-toast-stack')).toBeNull()
  })

  it('should apply the global config provided via provideNgxToast/withToastConfig', () => {
    TestBed.resetTestingModule()
    TestBed.configureTestingModule({
      providers: [
        provideNgxToast(withToastConfig({ title: 'Notice', autoClose: false })),
      ],
    })
    service = TestBed.inject(NgxToastService)

    service.showToastInfo('configured')

    expect(document.querySelector('.ngx-toast__title')?.textContent).toContain(
      'Notice',
    )
  })
})
