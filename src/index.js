
import transformProps from './transform-props'

const h = tag => (...args) => isProps(args[0])
  ? applyProps(tag)(args[0])
  : appendChildren(tag)(...args)

const isArr = o => Array.isArray(o)

const isObj = o => o !== null && typeof o === 'object' && !isArr(o)

const isProps = arg => isObj(arg) && !(arg instanceof Element)

const applyProps = tag => props => (...args) => {
  if (isProps(args[0])) {
    return h(tag)(Object.assign({}, props, args[0]))
  }

  const el = h(tag)(...args)
  const p = transformProps(props)
  Object.keys(p).forEach(k => {
    if(/^on/.test(k)) {
      el[k] = p[k]
    } else {
      el.setAttribute(k, p[k])
    }
  })
  return el
}

const walkArray = (arr) => {
  let res
  const walk = arr => {
    res = arr
    arr.map(c => isArr(c) ? walk(c) : res)
  }
  walk(arr)
  return res 
} 

const appendChildren = tag => (...children) => {
  const el = document.createElement(tag)
  children = isArr(children) && isArr(children[0]) ? walkArray(children) : children
  children.map(c => c instanceof Element ? c : document.createTextNode(c))
    .forEach(c => el.appendChild(c))
  return el
}

export default h

