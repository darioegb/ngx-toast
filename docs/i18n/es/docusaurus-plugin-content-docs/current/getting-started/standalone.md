---
title: App Standalone
sidebar_position: 1
---

# App Standalone (Angular >= 14)

No necesitás configuración - solo inyectá `NgxToastService` donde quieras y llamalo:

```typescript
import { Component, inject } from '@angular/core';
import { NgxToastService } from 'ngx-toastf';

@Component({...})
export class YourComponent {
  private readonly toastService = inject(NgxToastService);

  showSuccess(): void {
    this.toastService.showToastSuccess('Hola mundo!', { title: 'Prueba!' });
  }
}
```

Para sobrescribir los defaults globales (por ejemplo, mostrar siempre el botón de cerrar), agregá
`provideNgxToast()` a tu configuración de bootstrap:

```typescript
import { bootstrapApplication } from '@angular/platform-browser'
import { provideNgxToast, withToastConfig } from 'ngx-toastf'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
  providers: [provideNgxToast(withToastConfig({ closeButton: true }))],
})
```
