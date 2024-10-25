import { 
  tokenize, 
  // @ts-expect-error expose generate in sugar-high
  generate
} from 'sugar-high'
import { map as unistMap } from 'unist-util-map'
import rangeParser from 'parse-numeric-range'

const parseLang = (str) => {
  const match = (regexp) => {
    const m = (str || '').match(regexp)
    return Array.isArray(m) ? m.filter(Boolean) : []
  }

  const [lang = 'unknown'] = match(/^[a-zA-Z\d-]*/g)

  const range = rangeParser(
    match(/\{(.*?)\}$/g)
      .join(',')
      .replace(/^\{/, '')
      .replace(/\}$/, '')
  )

  return {
    lang,
    range,
  }
}

const h = (type, attrs, children) => {
  return {
    type: 'element',
    tagName: type,
    data: {
      hName: type,
      hProperties: attrs,
      hChildren: children,
    },
    properties: attrs,
    children,
  }
}

export const highlightCode = () => (tree) => {
  return unistMap(tree, (node) => {
    const { type, tagName } = node
    if (tagName !== 'code' && type !== 'code') return node

    const { lang } = parseLang(node.lang)

    const codeText =
      node.value ||
      node.children
        .filter(({ type }) => type === 'text')
        .map(({ value }) => value)
        .pop()

    const childrenLines = generate(tokenize(codeText))
    
    for (const line of childrenLines) {
      line.children.push(h('span', { className: 'sh__token--line' }, [{ type: 'text', value: '\n' }]))
    }

    const code = h(
      'code',
      {
        className: `sh-lang--${lang}`,
        ['data-sh-language']: `${lang}`,
      },
      childrenLines
    )

    const pre = h(
      'pre',
      {
        className: `sh-lang--${lang}`,
      },
      [code]
    )

    return pre
  })
}
