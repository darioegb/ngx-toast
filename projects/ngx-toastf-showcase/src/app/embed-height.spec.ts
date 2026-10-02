import { HEIGHT_MESSAGE_TYPE, reportHeightToParent } from './embed-height'

describe('reportHeightToParent', () => {
  let resizeCallback: () => void
  const observe = vi.fn()
  const disconnect = vi.fn()

  beforeEach(() => {
    observe.mockClear()
    disconnect.mockClear()
    vi.stubGlobal(
      'ResizeObserver',
      class {
        constructor(callback: () => void) {
          resizeCallback = callback
        }
        observe = observe
        disconnect = disconnect
      },
    )
  })

  afterEach(() => vi.unstubAllGlobals())

  function fakeDocument(inIframe: boolean) {
    const postMessage = vi.fn()
    const win: Record<string, unknown> = { ResizeObserver }
    win['parent'] = inIframe ? { postMessage } : win
    return {
      postMessage,
      doc: {
        defaultView: win,
        location: { origin: 'https://docs.test' },
        body: { getBoundingClientRect: () => ({ height: 640.4 }) },
      } as unknown as Document,
    }
  }

  it('should post the rounded-up body height to the parent window', () => {
    const { doc, postMessage } = fakeDocument(true)

    reportHeightToParent(doc)
    resizeCallback()

    expect(observe).toHaveBeenCalledWith(doc.body)
    expect(postMessage).toHaveBeenCalledWith(
      { type: HEIGHT_MESSAGE_TYPE, height: 641 },
      'https://docs.test',
    )
  })

  it('should stop observing when the returned cleanup runs', () => {
    const { doc } = fakeDocument(true)

    reportHeightToParent(doc)()

    expect(disconnect).toHaveBeenCalled()
  })

  it('should do nothing when the page is not inside an iframe', () => {
    const { doc } = fakeDocument(false)

    reportHeightToParent(doc)()

    expect(observe).toHaveBeenCalledTimes(0)
  })
})
