# RustJS
RustJS aims to be an engine that will convert Rust code into JavaScript code, so that it can run directly on the browser without issues instead of heavy web-assembly.

## How to install
The files for RustJS are hosted on <a href="https://rustjs.netlify.app/">Netlify</a>, so to install RustJS:<br>
  1. Add a `<script>` tag inside your HTML file. Place it before any runner files to avoid scope errors.
  2. Set the source of the script to the latest version of RustJS, so in this case, that would be v0.1.
```html
<script src="https://rustjs.netlify.app/rust.js@v0.1"></script>
```
You should be all set now.
<br>
In order to actually *use* RustJS, first, call the function `rustjs.init()`. Then to do the conversion, simply run `rustjs.convert()` anywhere after RustJS is initialised. Make sure to add the Rust code you would like to convert as the parameter. The function will return the JavaScript code.
