# NgToast

## Features

- Toast Component Injection without being passed `ViewContainerRef`
- Animations using Angular's

## Dependencies
Latest version available for each version of Angular

| ngx-toastr | Angular     |
|------------|-------------|
| 6.5.0      | 4.x         |
| 8.10.2     | 5.x         |
| 10.1.0     | 8.x 7.x 6.x |
| 11.3.3     | 8.x         |
| current    | >= 9.x      |

## Install

```bash
npm install ng-toast --save
```

`@angular/animations` package is a required dependency for the default toast

```bash
npm install @angular/animations --save
```

## Setup

**step 1:** add ToastrModule to app NgModule, make sure you have BrowserAnimationsModule as well

```typescript
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ng-toast';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    NgToastModule.forRoot() // ToastrModule added
  ],
  bootstrap: [App],
  declarations: [App]
})
class MainModule {}
```

## Use

```typescript
import { ToastrService } from 'ng-toast';

@Component({...})
export class YourComponent {
  constructor(private toastService: NgToastService) {}

  showToastSuccess() {
    this.toastr.showToastSuccess('Hello world!', { title: 'Test!' });
  }
}
```

## Options

There are **global options**.

### Global Options

Global options include the following
options:

| Option      | Type    | Default                         | Description                               |
|-------------|---------|---------------------------------|-------------------------------------------|
| title       | string  | null                            | Title for toast message                   |
| position    | object  | [see below](#position-defaults) | Toast container position                  |
| duration    | number  | 3000                            | Time to live in milliseconds              |
| closeButton | boolean | false                           | Show close button                         |
| tapDismiss  | boolean | false                           | Close on click                            |
| autoClose   | boolean | false                           | Dismiss current toast when max is reached |

##### position defaults

```typescript
NgToastPosition {
    BottomCenter = 0,
    BottomFullWidth = 1,
    BottomLeft = 2,
    BottomRight = 3,
    TopCenter = 4,
    TopFullWidth = 5,
    TopLeft = 6,
    TopRight = 7
};
```

## License

MIT

---

> GitLab [@darioegb](https://gitlab.com/darioegb) &nbsp;&middot;&nbsp;
