# NgxToastf

## Features

- Toast Component Injection without being passed `ViewContainerRef`
- Animations using Angular's

## Dependencies
Latest version available for each version of Angular

| ngx-toastf  | Angular     |
|------------|-------------|
| 1.0.0      | 9.x 8.x 7.x |

## Install

```bash
npm install ngx-toastf --save
```

`@angular/animations` package is a required dependency for the default toast

```bash
npm install @angular/animations --save
```

## Setup

**step 1:** Add NgToastModule to appModule, make sure you have BrowserAnimationsModule as well

```typescript
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastf';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule, // required animations module
    NgToastModule // ToastrModule added
  ],
  bootstrap: [App],
  declarations: [App]
})
class MainModule {}
```

**step 2:** Add fontawesome to angular.json file in styles array
```typescript
"styles": [
  // other styles
  "./node_modules/ngx-toastf/src/assets/fontawesome-5.12.1/css/all.min.css"
],
```
## Use

```typescript
import { ToastrService } from 'ngx-toastf';

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
    TopRight = 7,
    Center = 8
};
```

## Styles

### Global Styles

| Class                 | Description                               |
|-----------------------|-------------------------------------------|
| toast-container       | Toast container                           |
| toast-container-title | Toast container title, and symbol         |
| toast-container-body  | Toast container for message               |


### Toast type styles
  For customizations styles you can overwrite those classes:
  
  * .toast-container-success
  * .toast-container-info
  * .toast-container-warning
  * .toast-container-error

  ```scss
    .toast-container {
      &-success {
        background-color: green !important;
      }
      &-error {
        background-color: pink !important;
      }
  }
  ```

## Test

Ngx-toastf-showcase is the testing project. Use ng s to run it.
