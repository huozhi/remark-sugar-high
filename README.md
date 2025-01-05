# remark-sugar-high

Remark plugin for [Sugar High](https://sugar-high.vercel.app) syntax highlighter.

[Website](https://remark-sugar-high.vercel.app/)


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

Using [remark](https://github.com/remarkjs/remark):

```js
const { highlight } = require('remark-sugar-high');

await remark()
  .use(highlight)
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

Customize the color theme with sugar-high CSS variables, e.g.:

```css
:root {
  --sh-identifier: #354150;
  --sh-keyword: #f47067;
  --sh-string: #00a99a;
  --sh-class: #8d85ff;
  --sh-property: #4e8fdf;
  --sh-entity: #6eafad;
  --sh-jsxliterals: #bf7db6;
  --sh-sign: #8996a3;
  --sh-comment: #a19595;
}
```

Check [sugar-high highlight-with-css section](https://github.com/huozhi/sugar-high#highlight-with-css) for more details.


## License

MIT
