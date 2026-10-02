import { TestBed } from '@angular/core/testing'
import { provideRouter } from '@angular/router'
import { NgxToastService } from 'ngx-toastf'
import { AppComponent } from './app.component'

function mockClipboard(writeText: () => Promise<void>) {
  Object.defineProperty(navigator, 'clipboard', {
    value: { writeText },
    configurable: true,
  })
}

describe('AppComponent', () => {
  let toastService: NgxToastService

  function render() {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const root: HTMLElement = fixture.nativeElement
    return { fixture, root }
  }

  function click(root: HTMLElement, selector: string) {
    root.querySelector<HTMLElement>(selector)?.click()
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideRouter([])],
    })
    toastService = TestBed.inject(NgxToastService)
  })

  afterEach(() => {
    Reflect.deleteProperty(navigator, 'clipboard')
  })

  it('should create the app', () => {
    const { fixture } = render()
    expect(fixture.componentInstance).toBeTruthy()
  })

  it('should render a trigger button per toast type', () => {
    const { root } = render()
    expect(root.querySelectorAll('button[data-type]').length).toBe(4)
  })

  it('should render a button per toast position', () => {
    const { root } = render()
    expect(root.querySelectorAll('button[data-position]').length).toBe(9)
  })

  it.each([
    ['success', 'showToastSuccess'],
    ['info', 'showToastInfo'],
    ['warning', 'showToastWarning'],
    ['error', 'showToastError'],
  ] as const)('should show a %s toast', (type, method) => {
    const spy = vi.spyOn(toastService, method)
    const { root } = render()

    click(root, `button[data-type="${type}"]`)

    expect(spy).toHaveBeenCalledWith(
      'Changes saved successfully',
      expect.objectContaining({ title: 'Done' }),
    )
  })

  it('should pass showIcon=false when the icon switch is turned off', () => {
    const spy = vi.spyOn(toastService, 'showToastSuccess')
    const { fixture, root } = render()

    const toggle = root.querySelector<HTMLInputElement>('#showIcon')!
    toggle.checked = false
    toggle.dispatchEvent(new Event('change'))
    fixture.detectChanges()
    click(root, 'button[data-type="success"]')

    expect(spy).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ showIcon: false }),
    )
    expect(root.querySelector('code')?.textContent).toContain('showIcon: false')
  })

  it('should show the chosen position in the generated code', () => {
    const { fixture, root } = render()

    click(root, 'button[data-position="bottom-left"]')
    fixture.detectChanges()

    expect(root.querySelector('code')?.textContent).toContain(
      'NgxToastPosition.BottomLeft',
    )
  })

  it('should switch the code panel to the setup snippet', () => {
    const { fixture, root } = render()

    const setupTab = [...root.querySelectorAll('.nav-link')].find(
      (el) => el.textContent?.trim() === 'Setup',
    ) as HTMLElement
    setupTab.click()
    fixture.detectChanges()

    expect(root.querySelector('code')?.textContent).toContain('provideNgxToast')
  })

  it('should copy the snippet to the clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined)
    mockClipboard(writeText)
    const { fixture, root } = render()

    click(root, '.copy-btn')

    expect(writeText).toHaveBeenCalledWith(
      expect.stringContaining('showToastSuccess'),
    )
    await vi.waitFor(() => {
      fixture.detectChanges()
      expect(root.querySelector('.copy-btn')?.textContent).toContain('Copied!')
    })
  })

  it('should not flag the snippet as copied when the clipboard is unavailable', async () => {
    mockClipboard(vi.fn().mockRejectedValue(new Error('denied')))
    const { fixture, root } = render()

    click(root, '.copy-btn')
    await fixture.whenStable()
    fixture.detectChanges()

    expect(root.querySelector('.copy-btn')?.textContent).toContain('Copy')
    expect(
      root.querySelector('.copy-btn')?.textContent?.includes('Copied'),
    ).toBe(false)
  })

  it('should render the navbar outside of the docs iframe', () => {
    const { root } = render()
    expect(root.querySelector('nav')).toBeTruthy()
  })
})
