---
title: Standalone App
sidebar_position: 1
---

# Standalone App (Angular >= 14)

No setup is required - just inject `NgxToastService` anywhere and call it:

```typescript
import { Component, inject } from '@angular/core';
import { NgxToastService } from 'ngx-toastf';

@Component({...})
export class YourComponent {
  private readonly toastService = inject(NgxToastService);

  showSuccess(): void {
    this.toastService.showToastSuccess('Hello world!', { title: 'Test!' });
  }
}
```

To override the global defaults (e.g. always show a close button), add `provideNgxToast()` to your
bootstrap config:

```typescript
import { bootstrapApplication } from '@angular/platform-browser'
import { provideNgxToast, withToastConfig } from 'ngx-toastf'
import { AppComponent } from './app/app.component'

bootstrapApplication(AppComponent, {
  providers: [provideNgxToast(withToastConfig({ closeButton: true }))],
})
```
