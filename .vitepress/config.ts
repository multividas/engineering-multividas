import { defineConfig } from 'vitepress'
import { genFeed } from './genFeed.js'

export default defineConfig({
  lang: 'en-US',
  title: 'Multividas Engineering blog',
  description: 'Creative engineers and developers building a world where you can belong anywhere, Multividas Engineering blog is a technical news resource for engineers interested in how we solve large-scale technical challenges at Multividas.',
  lastUpdated: true,
  cleanUrls: true,
  head: [
    ['meta', { name: 'theme-color', content: '#0f4c81' }],
    // open graph SEO tips
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:type', content: 'Multividas Engineering blog' }],
    ['meta', { property: 'og:title', content: 'Multividas Engineering blog' }],
    [
      'meta',
      {
        property: 'og:description',
        content: 'With engineering.multividas.com, you can write and publish technical articles.'
      }
    ],
    [
      'meta',
      {
        property: 'og:image',
        content: 'xlogo/logo-multividas-blogging-platform-multividas-social-media-blog-multividas-posts-threads-multividas-comments-discussions-multividas-short-texts-multividas-social-blogging.svg'
      }
    ],
    ['meta', { property: 'og:url', content: 'engineering.multividas.com' }],
    [
      'meta',
      { property: 'og:site_name', content: 'Multividas Engineering blog' }
    ],
    // multividas tags
    ['meta', { property: 'multividas:card', description: 'summary' }],
    ['meta', { property: 'multividas:site', description: 'multividaseng' }],
    [
      'meta',
      {
        property: 'multividas:title',
        description: 'Multividas Engineering blog'
      }
    ],
    [
      'meta',
      {
        property: 'multividas:description',
        description: 'With engineering.multividas.com, you can write and publish technical articles.'
      }
    ],
    [
      'meta',
      {
        property: 'multividas:image',
        description: 'https://avatars.githubusercontent.com/u/137715137?v=4'
      }
    ],
    // usefathom
    [
      'script',
      {
        src: 'https://cdn.usefathom.com/script.js',
        'data-site': 'NYHGSGQV',
        'data-spa': 'auto',
        defer: ''
      }
    ],
    // favicon
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        src: 'https://developers.multividas.com/images/logo.svg'
      }
    ]
  ],
  sitemap: {
    hostname: 'https://engineering.multividas.com'
  },
  buildEnd: genFeed
})
