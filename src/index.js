
import transformProps from './transform-props'

const h = tag => (...args) => isProps(args[0])
  ? applyProps(tag)(args[0])
  : appendChildren(tag)(...args)

const isFunc = f => typeof f === 'function'
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

export default h

