
export const kebab = str => str.replace(/([A-Z])/g, g => '-' + g.toLowerCase())

export const parseValue = prop => val => typeof val === 'number' ? addPx(prop)(val) : val

export const unitlessProperties = [
  'lineHeight',
  'fontWeight',
  'opacity',
  'zIndex'
  // Probably need a few more...
]

export const addPx = prop => val => unitlessProperties.includes(prop) ? val : val + 'px'

export const filterNull = obj => key => obj[key] !== null

export const createDec = style => key => `${kebab(key)}:${parseValue(key)(style[key])}`

export const styleToString = style => Object.keys(style)
  .filter(filterNull(style))
  .map(createDec(style)).join(';')

export const isStyleObject = props => key => (key === 'style' && props[key] !== null && typeof props[key] === 'object')

export const createStyle = props => key => isStyleObject(props)(key) ? styleToString(props[key]) : props[key]

export const reduceProps = props => (a, key) => Object.assign(a, { [key]: createStyle(props)(key) })

export const transformProps = props => Object.keys(props).reduce(reduceProps(props), {})

export default transformProps

