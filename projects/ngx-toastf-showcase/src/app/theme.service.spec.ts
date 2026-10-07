import { TestBed } from '@angular/core/testing'
import { THEME_MESSAGE_TYPE, ThemeService } from './theme.service'

describe('ThemeService', () => {
  function create(search = '') {
    history.replaceState(null, '', `/${search}`)
    TestBed.resetTestingModule()
    return TestBed.inject(ThemeService)
  }

  function matchMedia(matches: boolean) {
    vi.stubGlobal(
      'matchMedia',
      vi.fn().mockReturnValue({ matches } as MediaQueryList),
    )
  }

  function postTheme(data: unknown, origin = location.origin) {
    window.dispatchEvent(new MessageEvent('message', { data, origin }))
  }

  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute('data-bs-theme')
    matchMedia(false)
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    history.replaceState(null, '', '/')
  })

  it('should default to the light theme and mark the document', () => {
    const service = create()

    expect(service.theme()).toBe('light')
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('light')
  })

  it('should follow the system color scheme when nothing is stored', () => {
    matchMedia(true)
    expect(create().theme()).toBe('dark')
  })

  it('should prefer the theme in the query string', () => {
    localStorage.setItem('ngx-toastf-showcase-theme', 'light')
    expect(create('?theme=dark').theme()).toBe('dark')
  })

  it('should ignore an invalid theme in the query string', () => {
    expect(create('?theme=purple').theme()).toBe('light')
  })

  it('should restore the theme saved by a previous visit', () => {
    localStorage.setItem('ngx-toastf-showcase-theme', 'dark')
    expect(create().theme()).toBe('dark')
  })

  it('should follow the docs theme in a standalone tab (same origin)', () => {
    localStorage.setItem('theme', 'dark')
    expect(create().theme()).toBe('dark')
  })

  it('should prefer its own saved theme over the docs theme when standalone', () => {
    localStorage.setItem('theme', 'dark')
    localStorage.setItem('ngx-toastf-showcase-theme', 'light')
    expect(create().theme()).toBe('light')
  })

  it('should toggle the theme and persist it', () => {
    const service = create()

    service.toggle()

    expect(service.theme()).toBe('dark')
    expect(localStorage.getItem('ngx-toastf-showcase-theme')).toBe('dark')
    expect(document.documentElement.getAttribute('data-bs-theme')).toBe('dark')

    service.toggle()
    expect(service.theme()).toBe('light')
  })

  it('should still toggle when storage is unavailable', () => {
    const service = create()
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('blocked')
    })

    service.toggle()

    expect(service.theme()).toBe('dark')
  })

  it('should start with the Docusaurus theme when embedded', () => {
    localStorage.setItem('theme', 'dark')
    const service = create('?embed')

    expect(service.embedded).toBe(true)
    expect(service.theme()).toBe('dark')
  })

  it('should fall back to the system scheme when storage is unreadable', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('blocked')
    })
    matchMedia(true)

    expect(create().theme()).toBe('dark')
  })

  describe('when embedded', () => {
    it('should apply the theme posted by the docs page', () => {
      const service = create('?embed')

      postTheme({ type: THEME_MESSAGE_TYPE, theme: 'dark' })

      expect(service.theme()).toBe('dark')
    })

    it.each([
      [
        'another origin',
        { type: THEME_MESSAGE_TYPE, theme: 'dark' },
        'https://evil.test',
      ],
      ['another message type', { type: 'other', theme: 'dark' }, undefined],
      [
        'an invalid theme',
        { type: THEME_MESSAGE_TYPE, theme: 'neon' },
        undefined,
      ],
      ['no payload', null, undefined],
    ])('should ignore messages with %s', (_name, data, origin) => {
      const service = create('?embed')

      postTheme(data, origin)

      expect(service.theme()).toBe('light')
    })
  })

  it('should not listen for messages when not embedded', () => {
    const service = create()

    postTheme({ type: THEME_MESSAGE_TYPE, theme: 'dark' })

    expect(service.theme()).toBe('light')
  })
})
