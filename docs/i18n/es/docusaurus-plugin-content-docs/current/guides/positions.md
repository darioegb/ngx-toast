---
title: Posiciones
sidebar_position: 1
---

# Posiciones

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

Cada posición tiene su propio stack fijo en columna - los toasts mostrados en distintas
posiciones se apilan de forma independiente:

```typescript
toastService.showToastSuccess('Guardado!', {
  position: NgxToastPosition.TopRight,
})
toastService.showToastInfo('También guardado!', {
  position: NgxToastPosition.BottomLeft,
})
```
