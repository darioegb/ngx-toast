import { NgxToastPosition, NgxToastType } from 'ngx-toastf'
import { SETUP_SNIPPET, buildUsageSnippet } from './code-snippet'

describe('buildUsageSnippet', () => {
  it('should omit options that match the library defaults', () => {
    const snippet = buildUsageSnippet(NgxToastType.Info, 'Hello', {
      position: NgxToastPosition.TopRight,
      duration: 3000,
    })

    expect(snippet).toContain("this.toastService.showToastInfo('Hello')")
    expect(snippet.includes('position')).toBe(false)
    expect(snippet.includes('duration')).toBe(false)
  })

  it('should list only the options that differ from the defaults', () => {
    const snippet = buildUsageSnippet(NgxToastType.Error, 'Oops', {
      title: 'Failed',
      duration: 5000,
      closeButton: true,
      autoClose: true,
      showIcon: false,
    })

    expect(snippet).toContain("title: 'Failed'")
    expect(snippet).toContain('duration: 5000')
    expect(snippet).toContain('closeButton: true')
    expect(snippet).toContain('showIcon: false')
    expect(snippet.includes('autoClose')).toBe(false)
  })

  it('should import and use the position enum member name', () => {
    const snippet = buildUsageSnippet(NgxToastType.Warning, 'Careful', {
      position: NgxToastPosition.BottomFullWidth,
    })

    expect(snippet).toContain(
      "import { NgxToastPosition, NgxToastService } from 'ngx-toastf'",
    )
    expect(snippet).toContain('position: NgxToastPosition.BottomFullWidth')
  })

  it('should only import the service when no position is set', () => {
    const snippet = buildUsageSnippet(NgxToastType.Success, 'Hi', {})
    expect(snippet).toContain("import { NgxToastService } from 'ngx-toastf'")
  })

  it('should escape quotes in strings', () => {
    const snippet = buildUsageSnippet(NgxToastType.Success, "It's done", {
      title: "Don't",
    })

    expect(snippet).toContain(String.raw`showToastSuccess('It\'s done'`)
    expect(snippet).toContain(String.raw`title: 'Don\'t'`)
  })
})

describe('SETUP_SNIPPET', () => {
  it('should show how to register the library', () => {
    expect(SETUP_SNIPPET).toContain('provideNgxToast')
  })
})
