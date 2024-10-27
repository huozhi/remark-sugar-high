# remark-sugar-high

Syntax highlighter for markdown code blocks using [Sugar High](https://sugar-high.vercel.app). This allows syntax highlighting without running any client-side code - other than CSS.


## Installation

```bash
$ npm i -S remark-sugar-high
```

## Usage

Input markdown file:

```
\`\`\`javascript
console.log('Hello World');
\`\`\`
```

Using [remark](https://github.com/remarkjs/remark) (mdast):

```js
require('unified')()
  .use(require('remark-sugar-high'))
  .use(require('remark-html'))
  .process(file, (err, file) => console.log(String(file)));
```

Output

```html
<pre class="sh-lang--javascript">
  <code class="sh-lang--javascript" data-sh-language="javascript">
    <span class="sh__line">
      <span class="sh__token--identifier" style="color: var(--sh-identifier)">
        console
      </span>
      <span class="sh__token--sign" style="color: var(--sh-sign)">
        .
      </span>
      <span class="sh__token--property" style="color: var(--sh-property)">
        log
      </span>
      <span class="sh__token--sign" style="color: var(--sh-sign)">
        (
      </span>
      <span class="sh__token--string" style="color: var(--sh-string)">
        '
      </span>
      <span class="sh__token--string" style="color: var(--sh-string)">
        Hello World
      </span>
      <span class="sh__token--string" style="color: var(--sh-string)">
        '
      </span>
      <span class="sh__token--sign" style="color: var(--sh-sign)">
        )
      </span>
      <span class="sh__token--sign" style="color: var(--sh-sign)">
        ;
      </span>
      <span class="sh__token--line"></span>
    </span>
  </code>
</pre>;
```


## License

MIT
