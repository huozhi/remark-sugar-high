import { renderMarkdown } from './markdown'

const markdownContent = `\
This is a python code block:

\`\`\`python
# Here is a simple function
def hello():
    print('Hello, world from Python!')
    return 123 # return a number
\`\`\`
`

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

export default async function Post() {
  const html = await renderMarkdown(markdownContent)
  return (
    <div>
      <h2>Example</h2>
      <h3>Markdown</h3>
      <pre>
        <code>{markdownContent}</code>
      </pre>

      <h3>Output</h3>
      <div dangerouslySetInnerHTML={{ __html: html }} />


      <hr />
      <h2>Usage</h2>

      <h3>Install</h3>
      <pre>
        <code>
          {`npm install remark remark-html remark-gfm remark-sugar-high`}
        </code>
      </pre>

      <h3>API</h3>
      <pre>
        <code>
          {usageCode}
        </code>
      </pre>
    </div>
  )
}
