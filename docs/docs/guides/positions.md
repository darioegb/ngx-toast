---
title: Positions
sidebar_position: 1
---

# Positions

```typescript
enum NgxToastPosition {
  BottomCenter = 'bottom-center',
  BottomFullWidth = 'bottom-full-width',
  BottomLeft = 'bottom-left',
  BottomRight = 'bottom-right',
  TopCenter = 'top-center',
  TopFullWidth = 'top-full-width',
  TopLeft = 'top-left',
  TopRight = 'top-right',
  Center = 'center',
}
```

Each position gets its own fixed, flex-column stack container - toasts shown at different
positions stack independently:

```typescript
toastService.showToastSuccess('Saved!', { position: NgxToastPosition.TopRight })
toastService.showToastInfo('Also saved!', {
  position: NgxToastPosition.BottomLeft,
})
```
