# RustJS
RustJS aims to be an engine that will convert Rust code into JavaScript code, so that it can run directly on the browser without issues instead of heavy web-assembly.

## How to install
### Static
The files for RustJS are hosted on here and on <a href="https://rustjs.netlify.app/"></a>, so to install RustJS, all you need to do is:<br>
  **1.** Add a `<script>` tag inside your HTML file. Place it before any runner files to avoid scope errors.
  **2.** Set the source of the script to the latest version of RustJS, so all you need to do is set the version to `latest`.
      <br>*NOTE: If you rely on a feature that becomes deprecated, it's recommended that you use a static version instead.*
```html
<script src="https://rustjs.netlify.app/cdn/rust.js/latest"></script>
```
### npm / Node.js
*Currently not supported in v0.1.
Support for Node.js will be added in a future release — so stay tuned for that.*

---
You should be all set now.
<br>
In order to actually *use* RustJS, first, call the function `rustjs.init()`. Then to do the conversion, simply run `rustjs.convert()` anywhere in your code after the point in which RustJS is initialised. Make sure to add the Rust code you would like to convert as the parameter. The function will return the JavaScript code that is the direct conversion of what the input Rust code was.
