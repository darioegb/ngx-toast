---
title: NgModule App (deprecated)
sidebar_position: 2
---

# NgModule App

:::caution Deprecated
`NgxToastModule` is kept for backward compatibility but will be removed in a future major version.
Prefer `provideNgxToast()`, including in NgModule-based apps (it returns a plain `Provider[]` you
can drop into your `providers` array).
:::

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgxToastModule } from 'ngx-toastf'

@NgModule({
  imports: [
    BrowserModule,
    NgxToastModule.forRoot(), // optional - pass a config object to override defaults
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

`NgxToastModule.forRoot({ closeButton: true })` is equivalent to
`provideNgxToast(withToastConfig({ closeButton: true }))`.
