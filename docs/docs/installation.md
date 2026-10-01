---
id: installation
title: Installation
sidebar_position: 2
---

# Installation

```bash
npm install ngx-toastf --save
```

That's it - `NgxToastService` is `providedIn: 'root'`, so no module or provider setup is required
for the defaults to work.

:::caution Breaking change in 2.0
`@angular/animations` is no longer a dependency (replaced by CSS transitions), and the fontello
icon font is gone (icons are now inline SVG) - drop both from your setup if you're upgrading from
1.x. See [Migration](./migration/v1-to-v2.md).
:::
