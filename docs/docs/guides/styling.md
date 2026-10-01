---
title: Styling
sidebar_position: 2
---

# Styling

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

The open/close CSS transition duration is controlled by the `animationDuration` option (default
`200`ms) and is applied via an inline `transition-duration` style, so it stays in sync with the
timer that removes the toast from the DOM.
