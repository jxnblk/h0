const kebab = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

const parseValue = prop => val => typeof val === 'number' ? addPx(prop)(val) : val

const unitlessProperties = [
  'lineHeight',
  'fontWeight',
  'opacity',
  'zIndex'
  // Probably need a few more...
]

const addPx = prop => val => unitlessProperties.includes(prop) ? val : val + 'px'

const filterNull = obj => key => obj[key] !== null

const createDec = style => key => `${kebab(key)}:${parseValue(key)(style[key])}`

const styleToString = style => Object.keys(style)
  .filter(filterNull(style))
  .map(createDec(style)).join(';')

const isStyleObject = props => key => (key === 'style' && props[key] !== null && typeof props[key] === 'object')

const createStyle = props => key => isStyleObject(props)(key) ? styleToString(props[key]) : props[key]

const reduceProps = props => (a, key) => Object.assign(a, { [key]: createStyle(props)(key) })

const transformProps = props => Object.keys(props).reduce(reduceProps(props), {})

const h = tag => (...args) => isProps(args[0])
  ? applyProps(tag)(args[0])
  : appendChildren(tag)(...args)

const isObj = o => o !== null && typeof o === 'object'

const isProps = arg => isObj(arg) && !(arg instanceof Element)

const applyProps = tag => props => (...args) => {
  if (isProps(args[0])) {
    return h(tag)(Object.assign({}, props, args[0]))
  }

  const el = h(tag)(...args)
  props = transformProps(props)
  Object.keys(props).forEach(k => el.setAttribute(k, props[k]))
  return el
}

const appendChildren = tag => (...children) => {
  const el = document.createElement(tag)
  children.map(c => c instanceof Element ? c : document.createTextNode(c))
    .forEach(c => el.appendChild(c))
  return el
}

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
  h1('hello h0'),
  p('Hyperminimal functional DOM element microlibrary'),
  a({ href: 'https://github.com/jxnblk/h0' })('GitHub'),
  pre(`const tree = h('div')(
  h('h1')('hello')
)`)
)

document.body.appendChild(App())