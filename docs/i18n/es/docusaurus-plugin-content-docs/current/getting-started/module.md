---
title: App con NgModule (deprecado)
sidebar_position: 2
---

# App con NgModule

:::caution Deprecado
`NgxToastModule` se mantiene por compatibilidad hacia atrás pero será eliminado en una futura
versión mayor. Preferí `provideNgxToast()`, incluso en apps basadas en NgModule (devuelve un
`Provider[]` plano que podés agregar a tu array `providers`).
:::

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { NgxToastModule } from 'ngx-toastf'

@NgModule({
  imports: [
    BrowserModule,
    NgxToastModule.forRoot(), // opcional - pasá un objeto de config para sobrescribir defaults
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

`NgxToastModule.forRoot({ closeButton: true })` es equivalente a
`provideNgxToast(withToastConfig({ closeButton: true }))`.
