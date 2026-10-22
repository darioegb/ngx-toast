---
title: Accessibility
sidebar_position: 3
---

# Accessibility

Everything below works out of the box, no configuration needed.

## Screen reader announcements

Toasts are announced through persistent, visually hidden live regions instead of making each toast
its own live region, since a region inserted together with its content is often not announced.

- Errors are announced **assertively**, everything else **politely**.
- The announcement is prefixed with the toast type (`Error: ...`), because the type is otherwise
  only conveyed by color and icon. The same text is available, visually hidden, inside the toast
  for screen reader users browsing the page.
- Toasts never steal focus, so they do not interrupt what the user is doing.

Translate or reword the type prefix, and the close button name, with the config:

```typescript
provideNgxToast(
  withToastConfig({
    closeButtonLabel: 'Cerrar',
    typeLabels: {
      success: 'Éxito',
      info: 'Info',
      warning: 'Aviso',
      error: 'Error',
    },
  }),
)
```

`typeLabels` is merged with the defaults, so you only need to pass the types you want to change.

## Timing

With `autoClose`, the timer pauses while the toast is hovered or has keyboard focus (WCAG 2.2.1)
and resumes with the time that was left. Set `pauseOnHover: false` to disable it.

## Keyboard

- **`Escape`** dismisses the most recent toast, one per press. It is ignored when another handler
  already handled the key (e.g. an open dialog calling `preventDefault()`), and it works whether
  or not `closeButton` or `tapDismiss` are enabled.
- The close button is a regular `<button>` with a visible `:focus-visible` outline and a target of
  at least 24x24px.

## Visuals

- The default colors meet the WCAG AA 4.5:1 contrast ratio. If you override them, keep that in mind.
- Under `prefers-reduced-motion: reduce` toasts only fade, they no longer slide.
- The title is not rendered as a heading, so toasts do not pollute the page's heading outline.
