---
id: configuration
title: Configuration
sidebar_position: 3
---

# Configuration

All options can be passed per-call as the last argument to `showToastX()`/`show()`, or set as
global defaults once via `provideNgxToast(withToastConfig({...}))` /
`NgxToastModule.forRoot({...})`.

| Option              | Type    | Default    | Description                                     |
| ------------------- | ------- | ---------- | ----------------------------------------------- |
| `title`             | string  | `''`       | Title for the toast message                     |
| `position`          | enum    | `TopRight` | Toast stack position                            |
| `duration`          | number  | `3000`     | Time to live in milliseconds (when `autoClose`) |
| `closeButton`       | boolean | `false`    | Show a close button                             |
| `tapDismiss`        | boolean | `false`    | Close when the toast itself is clicked          |
| `autoClose`         | boolean | `true`     | Automatically close after `duration`            |
| `animationDuration` | number  | `200`      | Open/close CSS transition duration (ms)         |

## Generic `show()`

Alongside the four typed methods (`showToastSuccess`, `showToastInfo`, `showToastWarning`,
`showToastError`), a generic method is also available:

```typescript
import { NgxToastType } from 'ngx-toastf'

toastService.show(NgxToastType.Info, 'Hello world!')
```

## Stacking

Calling any `showToastX()`/`show()` again while a toast is visible **stacks** a new toast rather
than replacing the existing one - multiple toasts (even in the same position) coexist until each
closes on its own.
