
# h0

Hyperminimal functional DOM element microlibrary

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
h('div') // returns an element creation function

h('div')({ id: 'hi' }) // returns an element creation function with attributes

h('div')({ id: 'hi' })('hello')
// returns a DOM element with an id and text content
// <div id='hi'>hello</div>

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

---

## Size



> h0@1.0.0-beta.1 size /Users/jxn/repos/h0
> bundle-size ./dist/index.js && bundle-size ./dist

[ { packages: './dist/index.js',
    bundle: '4.92 kB',
    min: '3.88 kB',
    gzip: '1.77 kB' } ]
[ { packages: './dist',
    bundle: '4.91 kB',
    min: '3.88 kB',
    gzip: '1.74 kB' } ]


MIT License
