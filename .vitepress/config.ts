import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'

export default defineConfig({
  title: 'Multividas Engineering blog',
  description: 'Creative engineers and developers building a world where you can belong anywhere',
  cleanUrls: true,
  head: [
    ['meta', { name: 'twitter:site', content: '@multividascom' }],
    ['meta', { name: 'twitter:card', content: 'summary' }],
    [
      'meta',
      {
        name: 'twitter:image',
        content: 'https://avatars.githubusercontent.com/u/137715137?v=4'
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ],
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'NYHGSGQV',
        'data-spa': 'auto',
        defer: ''
      }
    ]
  ],
  buildEnd: genFeed
})
