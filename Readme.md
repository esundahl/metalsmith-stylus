metalsmith-stylus
===============
[![Build Status](https://travis-ci.org/esundahl/metalsmith-stylus.svg?branch=master)](https://travis-ci.org/esundahl/metalsmith-stylus)
![Dependency Status](https://david-dm.org/esundahl/metalsmith-stylus.png)

A [Stylus](http://learnboost.github.io/stylus/) plugin for Metalsmith.

## Installation

```sh
npm install --save metalsmith-stylus
```

## Getting Started

If you haven't checked out [Metalsmith](http://metalsmith.io/) before, head over to their website and check out the
documentation.

## CLI Usage

If you are using the command-line version of Metalsmith, you can install via npm, and then add the
`metalsmith-stylus` key to your `metalsmith.json` file:

```json
{
  "plugins": {
    "metalsmith-stylus": {}
  }
}
```

## JavaScript API

If you are using the JS Api for Metalsmith, then you can require the module and add it to your
`.use()` directives:

```js
var stylus = require('metalsmith-stylus');

metalsmith.use(stylus());
```

## Options

* ``paths`` - Pass an array of paths to stylus for ``@include`` and ``@require``.
* ``src`` - Use a different source folder. The root of the specified folder will map to the root
  of the output folder.
