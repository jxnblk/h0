
import h from '../src/index'

console.log('hello h0')

const h1 = h('h1')
const p = h('p')
const a = h('a')({
  style: {
    color: '#07c'
  }
})

const pre = h('pre')({
  style: {
    fontFamily: 'inherit',
    color: 'magenta'
  }
})

const container = h('div')({
  style: {
    fontFamily: 'SFMono-Regular, Menlo, monospace',
    padding: 32
  }
})

const App = () => container(
  h('header')(
    h1('hello h0'),
    p('Hyperminimal functional DOM element microlibrary'),
    a({ href: 'https://github.com/jxnblk/h0' })('GitHub')
  ),
  pre(`const tree = h('div')(
  h('h1')('hello')
)`)
)

document.body.appendChild(App())

