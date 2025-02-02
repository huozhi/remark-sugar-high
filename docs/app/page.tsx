import { renderMarkdown } from './markdown'
import { code as jsCode } from './languages/javascript'
import { code as cssCode } from './languages/css'
import { code as htmlCode } from './languages/html'
import { code as pythonCode } from './languages/python'
import { code as rustCode } from './languages/rust'
import { Code } from 'codice'

const usageCode = `\
\`\`\`javascript {2,9}
import { remark } from 'remark'
import { highlight } from 'remark-sugar-high'
import html from 'remark-html'
import gfm from 'remark-gfm'

async function renderMarkdown(input) {
  const markdown = await remark()
    .use(gfm)
    .use(highlight)
    .use(html, { sanitize: false })
    .process(input)

  return markdown.toString()
}

export default async Preview({ markdown }) {
  const html = await renderMarkdown(markdown)
  return (
    <div dangerouslySetInnerHTML={{ __html: html }} /> 
  )
}
\`\`\`
`

async function CodeExample({
  filename,
  code,
}: {
  filename: string
  code: string
}) {
  const html = await renderMarkdown(code)
  return (
    <Code className="code" title={filename} preformatted={false} asMarkup>
      {html}
    </Code>
  )
}

export default async function Post() {
  return (
    <div>
      <p>
        Use{' '}
        <a href="https://sugar-high.vercel.app/" target="_blank">
          Sugar High Syntax Highlighting 
        </a> with Remark Plugin.{' '}
        <a href="https://github.com/huozhi/remark-sugar-high" target="_blank">
          Source Code ↗
        </a>
      </p>
      <h2>Usage</h2>
      <h3>Install</h3>
      <pre>
        <code>{`npm install remark remark-html remark-gfm remark-sugar-high`}</code>
      </pre>

      <h3>API</h3>

      <CodeExample filename="remark-plugin.js" code={usageCode} />

      <h2>Examples</h2>

      <CodeExample filename="script.js" code={jsCode} />
      <CodeExample filename="mod.rs" code={rustCode} />
      <CodeExample filename="print.py" code={pythonCode} />
      <CodeExample filename="styles.css" code={cssCode} />
      <CodeExample filename="index.html" code={htmlCode} />
    </div>
  )
}
