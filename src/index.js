
import transformProps from './transform-props'

const svgTags = [
  'svg',
  'altGlyph',
  'altGlyphDef',
  'altGlyphItem',
  'animate',
  'animateColor',
  'animateMotion',
  'animateTransform',
  'circle',
  'clipPath',
  'color-profile',
  'cursor',
  'defs',
  'desc',
  'ellipse',
  'feBlend',
  'feColorMatrix',
  'feComponentTransfer',
  'feComposite',
  'feConvolveMatrix',
  'feDiffuseLighting',
  'feDisplacementMap',
  'feDistantLight',
  'feFlood',
  'feFuncA',
  'feFuncB',
  'feFuncG',
  'feFuncR',
  'feGaussianBlur',
  'feImage',
  'feMerge',
  'feMergeNode',
  'feMorphology',
  'feOffset',
  'fePointLight',
  'feSpecularLighting',
  'feSpotLight',
  'feTile',
  'feTurbulence',
  'filter',
  'font',
  'font-face',
  'font-face-format',
  'font-face-name',
  'font-face-src',
  'font-face-uri',
  'foreignObject',
  'g',
  'glyph',
  'glyphRef',
  'hkern',
  'image',
  'line',
  'linearGradient',
  'marker',
  'mask',
  'metadata',
  'missing-glyph',
  'mpath',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'set',
  'stop',
  'switch',
  'symbol',
  'text',
  'textPath',
  // 'title',
  'tref',
  'tspan',
  'use',
  'view',
  'vkern'
]

const createEl = tag => {
  if (svgTags.indexOf(tag) !== -1) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag)
  }

  return document.createElement(tag)
}

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

const appendChildren = tag => (...children) => {
  if (typeof children === 'undefined') {
    console.log('appendChildren no children', tag)
  }
  const el = createEl(tag)
  children.map(c => {
    if (typeof c === 'function') {
      return c()
    } else if (typeof c === 'string' || typeof c === 'number') {
      return document.createTextNode(c)
    } else if (c instanceof Element) {
      return c
    }
    return
  })
  .filter(c => typeof c !== 'undefined' && c !== null && c !== false)
  .forEach(c => {
    el.appendChild(c)
  })

  return el
}

export default h

