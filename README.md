
# h0

![h0](https://cloud.githubusercontent.com/assets/3451712/16896009/c90f18f0-4b54-11e6-81e3-dbde27b3fcb0.png)

Hyperminimal functional DOM element microlibrary

[![Build Status](https://travis-ci.org/jxnblk/h0.svg?branch=master)](https://travis-ci.org/jxnblk/h0)

**Experimental**

```sh
npm i h0
```

## Basic usage

```js
import h from 'h0'

const tree = h('div')({
  style: {
    padding: 32
  }
})(
  h('h1')('hello')
)
```

## Creating element functions

```js
const div = h('div')
const h1 = h('h1')
const a = h('a')

const tree = div(
  h1('hello'),
  a({ href: '/hello' })('hi')
)
```

## Creating styled element functions

```js
const h1 = h('h1')({
  style: {
    fontSize: 48,
    fontWeight: 500
  }
})

const tree = h1('hello')
```

## API

### `h()`

Function that returns an element creation function with the given tagname.
The returned function accepts either a plain object to set attributes, or a string or child elements to return an element.

```js
h('div')
// returns an element creation function

h('div')({ class: 'hi' })
// returns an element creation function with attributes

h('div')({ class: 'hi' })('hello')
// returns a DOM element with an id and text content
// <div class='hi'>hello</div>

h('div')('hello')
// returns a DOM element with text content
// <div>hello</div>

h('div')(
  h('h1')('hello')
)
// returns a DOM element with child element
// <div>
//   <h1>hello</h1>
// </div>
```

MIT License
