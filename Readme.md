metalsmith-stylus
===============
[![Build Status](https://travis-ci.org/esundahl/metalsmith-stylus.svg?branch=master)](https://travis-ci.org/esundahl/metalsmith-stylus)
[![Dependency Status](https://david-dm.org/esundahl/metalsmith-stylus.png)](https://david-dm.org/esundahl/metalsmith-stylus)

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

All option keys will be passed to stylus' [`set`](https://learnboost.github.io/stylus/docs/js.html#setsetting-value) method, except [`define`](https://learnboost.github.io/stylus/docs/js.html#definename-node) and [`use`](https://learnboost.github.io/stylus/docs/js.html#usefn).

To use stylus plug-ins like [nib](http://tj.github.io/nib/) or [autoprefixer](https://github.com/jenius/autoprefixer-stylus), add them as array to `use`:

```js
var stylus = require('metalsmith-stylus');
var nib = require('nib');

metalsmith.use(stylus({
	// Set stylus output to compressed
	compress: true,
	// Use the 'nib' plug-in
	use: [nib()],
	// Inline images as base64
	define: {
		url: stylus.url()
	}
}));
```
