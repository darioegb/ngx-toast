import { Injectable, inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

type Politeness = 'polite' | 'assertive'

// A live region only announces changes made after it is already in the DOM, so the first message
// waits a moment for assistive technology to register the freshly created region.
const REGISTER_DELAY_MS = 100
const CLEAR_DELAY_MS = 5000

const VISUALLY_HIDDEN_STYLE: Partial<CSSStyleDeclaration> = {
  position: 'absolute',
  width: '1px',
  height: '1px',
  margin: '-1px',
  padding: '0',
  border: '0',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  whiteSpace: 'nowrap',
}

/**
 * Announces toasts through persistent, visually hidden live regions instead of making each toast
 * its own live region, since a region inserted together with its content is often not announced.
 */
@Injectable({ providedIn: 'root' })
export class NgxToastAnnouncer {
  private readonly document = inject(DOCUMENT)
  private readonly regions = new Map<Politeness, HTMLElement>()

  announce(message: string, politeness: Politeness): void {
    const region = this.getRegion(politeness)
    setTimeout(() => {
      // One node per message, so announcements fired close together are not overwritten.
      const entry = this.document.createElement('div')
      entry.textContent = message
      region.appendChild(entry)
      setTimeout(() => entry.remove(), CLEAR_DELAY_MS)
    }, REGISTER_DELAY_MS)
  }

  private getRegion(politeness: Politeness): HTMLElement {
    const existing = this.regions.get(politeness)
    if (existing) {
      return existing
    }
    const region = this.document.createElement('div')
    region.classList.add('ngx-toast-announcer')
    region.setAttribute('aria-live', politeness)
    region.setAttribute('aria-atomic', 'false')
    region.setAttribute('aria-relevant', 'additions')
    Object.assign(region.style, VISUALLY_HIDDEN_STYLE)
    this.document.body.appendChild(region)
    this.regions.set(politeness, region)
    return region
  }
}
