import { tokenize, generate, type HighlightOptions } from 'sugar-high'
import { map as unistMap } from 'unist-util-map'
import rangeParser from 'parse-numeric-range'
import * as languagesOptions from './lang'

function cx(...args: any[]): string {
  return args.filter(Boolean).join(' ')
}

type HighlightRange = number | [number, number]

/**
 * Parses highlight information from the `meta` field of a Remark code block node.
 * @param meta The `meta` string containing highlight information, e.g., "{1,3-5}".
 * @returns An array of highlight ranges. Single numbers represent single lines, and tuples represent ranges.
 */
function parseHighlightMeta(meta?: string): HighlightRange[] {
  if (!meta) return []

  const highlightRegex = /{([\d,-]+)}/ // Matches {1,3-5}
  const match = meta.match(highlightRegex)

  if (!match) return []

  const ranges = match[1].split(',').map((range) => {
    if (range.includes('-')) {
      const [start, end] = range.split('-').map(Number)
      return [start, end] as [number, number]
    }
    return Number(range)
  })

  return ranges
}

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

const highlight = () => (tree) => {
  return unistMap(tree, (node) => {
    const { type, tagName } = node
    if (tagName !== 'code' && type !== 'code') return node

    const { lang } = parseLang(node.lang)

    const highlightRanges = parseHighlightMeta(node.meta)

    let options: HighlightOptions | undefined = undefined

    if (lang in languagesOptions) {
      options = languagesOptions[lang]
    }

    const codeText =
      node.value ||
      node.children
        .filter(({ type }) => type === 'text')
        .map(({ value }) => value)
        .pop()

    const childrenLines = generate(tokenize(codeText, options))

    let lineIndex = 1
    for (const line of childrenLines) {
      // if it's highlighted lines, add a classname `sh__line--highlighted`
      let isCurrentLineHighlighted = highlightRanges.includes(lineIndex)
      

      let highLightClassName = ''
      if (isCurrentLineHighlighted) {
        highLightClassName = 'sh__line--highlighted'
      }

      // add line break
      line.children.push(
        h(
          'span',
          {
            className: `sh__token--line`,
          },
          [{ type: 'text', value: '\n' }]
        )
      )

      // add class to line
      line.properties.className = cx(
        line.properties.className,
        highLightClassName
      )

      lineIndex++
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

export { highlight }
export default highlight
