# NgxToastf

![CI](https://github.com/darioegb/ngx-toast/actions/workflows/ci.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-toast&metric=alert_status)](https://sonarcloud.io/dashboard?id=darioegb_ngx-toast)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=darioegb_ngx-toast&metric=coverage)](https://sonarcloud.io/dashboard?id=darioegb_ngx-toast)

📖 **[Official Documentation](https://darioegb.github.io/ngx-toast/)**

**ngx-toastf** is a lightweight, standalone-first toast notification library for Angular apps -
no `ViewContainerRef` or template markup required, just inject a service and call it.

## Features

- ✅ **Zero setup** - `NgxToastService` works out of the box, no provider or module required
- ✅ **Standalone-first** - `provideNgxToast()` for standalone apps; `NgxToastModule` for NgModule
  apps (deprecated)
- ✅ **CSS transitions** - no `@angular/animations` dependency
- ✅ **Stacking** - multiple toasts coexist and stack per position
- ✅ **9 positions**, 4 types (success/info/warning/error), configurable duration/auto-close/
  animation timing
- ✅ **Signal-based component** - `input()`/`output()`, `OnPush`, zero `@Input`/`@Output` decorators

## Compatibility

Latest version available for each version of Angular:

| ngx-toastf | Angular      |
| ---------- | ------------ |
| 2.0.0      | 20.x to 22.x |
| 1.2.1      | 9.x 8.x 7.x  |

## Live Example

You can check how this library works in the following link, on a live example:
[ngx-toastf-example](https://stackblitz.com/edit/ngx-toastf-example)

## Installation

```bash
npm install ngx-toastf --save
```

> Breaking change in 2.0: `@angular/animations` is no longer a dependency (replaced by CSS
> transitions), and the fontello icon font is gone (icons are now inline SVG) - drop both from
> your setup. See [Migration](#migration-from-1x) below.

## Setup

**Standalone apps (Angular >= 14):** no setup is required - `NgxToastService` is
`providedIn: 'root'` with sensible defaults. Only add `provideNgxToast()` if you want to override
the global defaults:

```typescript
import { provideNgxToast, withToastConfig } from 'ngx-toastf'

bootstrapApplication(AppComponent, {
  providers: [
    provideNgxToast(withToastConfig({ closeButton: true })),
    // ...other providers
  ],
})
```

**NgModule apps:**

```typescript
import { NgxToastModule } from 'ngx-toastf'

@NgModule({
  imports: [
    BrowserModule,
    NgxToastModule.forRoot(), // optional - pass a config object to override defaults
  ],
})
export class AppModule {}
```

> **Deprecated:** `NgxToastModule` is kept for backward compatibility but will be removed in a
> future major version. Prefer `provideNgxToast()`, including in NgModule-based apps (it returns a
> plain `Provider[]` you can drop into your `providers` array).

## Usage

```typescript
import { Component, inject } from '@angular/core'
import { NgxToastService, NgxToastType } from 'ngx-toastf'

@Component({...})
export class YourComponent {
  private readonly toastService = inject(NgxToastService)

  showSuccess(): void {
    this.toastService.showToastSuccess('Hello world!', { title: 'Test!' })
  }

  showCustomType(): void {
    // Generic show() also available alongside the four typed methods
    this.toastService.show(NgxToastType.Info, 'Hello world!')
  }
}
```

Calling any `showToastX()`/`show()` again while a toast is visible **stacks** a new toast rather
than replacing the existing one - multiple toasts (even in the same position) coexist.

## Options

| Option            | Type    | Default    | Description                                   |
| ----------------- | ------- | ---------- | --------------------------------------------- |
| title             | string  | `''`       | Title for the toast message                   |
| position          | enum    | `TopRight` | Toast stack position, see below               |
| duration          | number  | `3000`     | Time to live in milliseconds (when autoClose) |
| closeButton       | boolean | `false`    | Show a close button                           |
| tapDismiss        | boolean | `false`    | Close when the toast itself is clicked        |
| autoClose         | boolean | `true`     | Automatically close after `duration`          |
| animationDuration | number  | `200`      | Open/close CSS transition duration (ms)       |

You can pass any of these per-call as the last argument to `showToastX()`/`show()`, or set global
defaults once via `provideNgxToast(withToastConfig({...}))` / `NgxToastModule.forRoot({...})`.

##### Position values

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

## Styling

Each toast's host element gets a base `ngx-toast` class plus a type modifier
(`ngx-toast--success` / `-info` / `-warning` / `-error`) and a state modifier
(`ngx-toast--opening` / `-open` / `-closing`). Override the type classes to customize colors:

```scss
.ngx-toast--success {
  background-color: green !important;
}
.ngx-toast--error {
  background-color: pink !important;
}
```

## Migration from 1.x

- `NgToastService`/`NgToastComponent`/`NgToastModule`/`NgToastConfig`/`NgToastPosition`/
  `NgToastType` are renamed to `NgxToast*`.
- Drop `@angular/animations` and `BrowserAnimationsModule` - no longer needed.
- Drop the fontello CSS import (`ngx-toastf/src/assets/fontello/css/all.min.css`) - icons are now
  inline SVG, bundled with the component.
- `NgToastConfig` is now an interface (not a class) - replace `new NgToastConfig({...})` with a
  plain object literal.
- Showing a new toast no longer replaces an existing one - toasts now stack. If you relied on the
  old single-toast/duplicate-blocking behavior, close the previous toast explicitly first.

## Test

`ngx-toastf-showcase` is the demo project. Use `pnpm start` to run it.

## License

MIT

---

> Github [@darioegb](https://github.com/darioegb)
