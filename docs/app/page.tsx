import { renderMarkdown } from './markdown'
import { code as jsCode } from './languages/javascript'
import { code as cssCode} from './languages/css'
import { code as htmlCode } from './languages/html'
import { code as pythonCode } from './languages/python'

const usageCode = `\
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
`

async function CodeExample(
  { 
    filename, 
    code,
    showCode = false
  }: {
    filename: string
    code: string
    showCode?: boolean
  }
) {
  const html = await renderMarkdown(code)
  return (
    <div className='code'>
      <p className='code-filename'>{filename}</p>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      {showCode &&
        <pre>
          <code>{code}</code>
        </pre>
      }
    </div>
  )
}


export default async function Post() {
  return (
    <div>      
      <h2>Usage</h2>
      <h3>Install</h3>
      <pre>
        <code>
          {`npm install remark remark-html remark-gfm remark-sugar-high`}
        </code>
      </pre>

      <h3>API</h3>
      {/* <pre>
        <code>
          {usageCode}
        </code>
      </pre> */}

      <CodeExample filename='remark-plugin.js' code={
        '```\n' + usageCode + '\n```'
      } />

      <h2>Examples</h2>
      
      <CodeExample filename='script.js' code={jsCode} />
      <CodeExample filename='print.py' code={pythonCode} />
      <CodeExample filename='styles.css' code={cssCode} />
      <CodeExample filename='index.html' code={htmlCode} />
    </div>
  )
}
