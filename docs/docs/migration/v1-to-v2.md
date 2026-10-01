---
title: Migrating from 1.x to 2.0
sidebar_position: 1
---

# Migrating from 1.x to 2.0

- `NgToastService`/`NgToastComponent`/`NgToastModule`/`NgToastConfig`/`NgToastPosition`/
  `NgToastType` are renamed to `NgxToast*`.
- Drop `@angular/animations` and `BrowserAnimationsModule` - no longer needed, replaced by CSS
  transitions.
- Drop the fontello CSS import (`ngx-toastf/src/assets/fontello/css/all.min.css`) - icons are now
  inline SVG, bundled with the component.
- `NgToastConfig` is now an interface (not a class) - replace `new NgToastConfig({...})` with a
  plain object literal.
- `position` values are now string enums (e.g. `'top-right'`) instead of numeric indexes.
- Showing a new toast no longer replaces an existing one - toasts now stack. If you relied on the
  old single-toast/duplicate-blocking behavior, close the previous toast explicitly first.
- A new generic `show(type, message, config?)` method is available alongside the four typed
  `showToastX()` methods.
