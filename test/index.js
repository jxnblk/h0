
import 'babel-register'
import test from 'ava'
import jsdom from 'jsdom-global'
import h from '../src'

jsdom('<html></html>')

global.Element = window.Element
// document.Element = HTMLELement

test('returns a function', t => {
  t.is(typeof h('div'), 'function')
})

test('returns an element', t => {
  const div = h('div')()
  t.is(div.tagName, 'DIV')
})

test('returns an element with text', t => {
  const div = h('div')('hello')
  t.is(div.textContent, 'hello')
})

test('returns a function with props applied', t => {
  t.plan(2)
  const h1 = h('h1')({ style: 'font-weight:400' })
  const heading = h1('hi')
  t.is(typeof h1, 'function')
  t.regex(heading.outerHTML, /style/)
})

test('applies style objects', t => {
  t.plan(2)
  const heading = h('h1')({
    style: {
      fontSize: 32,
      color: 'tomato'
    }
  })('hello')
  t.regex(heading.outerHTML, /font-size:32px;/)
  t.regex(heading.outerHTML, /color:tomato/)
})

test('creates multiple instances with the same configured function', t => {
  t.plan(2)
  const h1 = h('h1')({ style: 'color:tomato' })
  const a = h1('hello')
  const b = h1('hi')
  t.true(a !== b)
  t.is(a.textContent, 'hello')
})

test('combines multiple arguments to props', t => {
  t.plan(2)
  const a = h('a')({ style: { color: 'blue' } })
  const link = a({ href: '#hi' })('hello')
  t.regex(link.outerHTML, /href/)
  t.regex(link.outerHTML, /style/)
})

test('is nestable', t => {
  t.plan(4)
  const tree = h('div')(
    h('h1')('hello'),
    h('p')('hi')
  )
  t.is(tree.tagName, 'DIV')
  t.regex(tree.innerHTML, /^<h1>/)
  t.regex(tree.innerHTML, /hello/)
  t.regex(tree.innerHTML, /hi/)
})

test('creates svg tags', t => {
  const tree = h('svg')(
    h('path')()
  )
  t.is(tree.tagName, 'svg')
})

