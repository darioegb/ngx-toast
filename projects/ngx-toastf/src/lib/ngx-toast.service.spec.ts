import { TestBed } from '@angular/core/testing'
import { NgxToastService } from './ngx-toast.service'
import { NgxToastType } from './ngx-toast-type.enum'
import { NgxToastPosition } from './ngx-toast-position.enum'
import { provideNgxToast, withToastConfig } from './provide-ngx-toast'

describe('NgxToastService', () => {
  let service: NgxToastService

  afterEach(() => {
    vi.useRealTimers()
    document
      .querySelectorAll('.ngx-toast-stack, .ngx-toast-announcer')
      .forEach((element) => element.remove())
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

  describe('accessibility', () => {
    const region = (politeness: string) =>
      document.querySelector(`.ngx-toast-announcer[aria-live="${politeness}"]`)

    it('should announce a toast politely, prefixed with its type', () => {
      vi.useFakeTimers()
      service.showToastSuccess('Saved', { autoClose: false })
      vi.advanceTimersByTime(100)

      expect(region('polite')?.textContent).toBe('Success: Saved')
    })

    it('should announce errors assertively', () => {
      vi.useFakeTimers()
      service.showToastError('Boom', { autoClose: false })
      vi.advanceTimersByTime(100)

      expect(region('assertive')?.textContent).toBe('Error: Boom')
      expect(region('polite')).toBeNull()
    })

    it('should include the title and honor custom type labels', () => {
      vi.useFakeTimers()
      service.showToastWarning('Disk almost full', {
        title: 'Storage',
        autoClose: false,
        typeLabels: { warning: 'Aviso' },
      })
      vi.advanceTimersByTime(100)

      expect(region('polite')?.textContent).toBe(
        'Aviso: Storage. Disk almost full',
      )
    })

    it('should keep announcements made close together', () => {
      vi.useFakeTimers()
      service.showToastInfo('one', { autoClose: false })
      service.showToastInfo('two', { autoClose: false })
      vi.advanceTimersByTime(100)

      expect(region('polite')?.childElementCount).toBe(2)
    })

    it('should clear an announcement after a while', () => {
      vi.useFakeTimers()
      service.showToastInfo('one', { autoClose: false })
      vi.advanceTimersByTime(100 + 5000)

      expect(region('polite')?.childElementCount).toBe(0)
    })

    describe('Escape key', () => {
      function pressEscape(): void {
        document.dispatchEvent(
          new KeyboardEvent('keydown', { key: 'Escape', cancelable: true }),
        )
      }

      it('should dismiss the most recent toast, one per press', () => {
        vi.useFakeTimers()
        service.showToastSuccess('first', {
          autoClose: false,
          animationDuration: 0,
        })
        service.showToastInfo('second', {
          autoClose: false,
          animationDuration: 0,
        })

        pressEscape()
        vi.advanceTimersByTime(0)
        expect(document.querySelector('.ngx-toast--info')).toBeNull()
        expect(document.querySelector('.ngx-toast--success')).not.toBeNull()

        pressEscape()
        vi.advanceTimersByTime(0)
        expect(document.querySelector('.ngx-toast--success')).toBeNull()
      })

      it('should skip a toast that is already closing', () => {
        vi.useFakeTimers()
        service.showToastSuccess('first', {
          autoClose: false,
          animationDuration: 100,
        })
        service.showToastInfo('second', {
          autoClose: false,
          animationDuration: 100,
        })

        pressEscape()
        pressEscape()
        vi.advanceTimersByTime(100)

        expect(document.querySelector('.ngx-toast--info')).toBeNull()
        expect(document.querySelector('.ngx-toast--success')).toBeNull()
      })

      it('should ignore other keys and handled events', () => {
        vi.useFakeTimers()
        service.showToastSuccess('stay', {
          autoClose: false,
          animationDuration: 0,
        })

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
        const handled = new KeyboardEvent('keydown', {
          key: 'Escape',
          cancelable: true,
        })
        handled.preventDefault()
        document.dispatchEvent(handled)
        vi.advanceTimersByTime(0)

        expect(document.querySelector('.ngx-toast--success')).not.toBeNull()
      })

      it('should stop listening once every toast is closed', () => {
        vi.useFakeTimers()
        const remove = vi.spyOn(document, 'removeEventListener')
        service.showToastSuccess('bye', {
          autoClose: false,
          animationDuration: 0,
        })

        pressEscape()
        vi.advanceTimersByTime(0)

        expect(remove).toHaveBeenCalledWith('keydown', expect.any(Function))
      })
    })
  })
})
