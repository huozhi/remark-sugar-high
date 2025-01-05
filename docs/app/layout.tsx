import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import './style.css'

export const metadata = {
  title: 'Remark Sugar High',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable + ' ' + GeistMono.variable}>
      <body>
        <h1>Remark Sugar High</h1>
        
        {children}
        <footer>
          <p>
            Created by{' '}
            <a href="https://twitter.com/huozhi" target="_blank">
              {`@huozhi`}
            </a>
            . Source code on{' '}
            <a href="https://github.com/huozhi/remark-sugar-high" target="_blank">
              GitHub
            </a>
            . Licensed under MIT.
          </p>
        </footer>
      </body>
    </html>
  )
}
