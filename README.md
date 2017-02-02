# @scriptwerx/web-storage

Provides a key-value (string-object) storage, that is backed by localStorage or sessionStorage with support for expiry.

**N.B. Expiry is set in days for localStorage and minutes for sessionStorage.**

Objects put or retrieved from this storage are automatically serialized or deserialized.

## Installation

Node Package Manager:

    npm install --save-dev @scriptwerx/web-storage

## Dependencies

@scriptwerx/web-storage depends on [Angular 2][] and is tested with version 2.4.5.

## Supported Browsers

@scriptwerx/web-storage will function correctly within all browsers that support [Web Storage][].

For browsers with Web Storage disabled or in private browsing mode; a simple in-session Object fallback is used - **please be aware of the limitations in this scenario**.

---

The MIT License (MIT)

Copyright (c) 2016 [Scriptwerx][]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


[Angular 2]: http://angular.io
[Web Storage]: http://caniuse.com/#feat=namevalue-storage
[Scriptwerx]: http://scriptwerx.io