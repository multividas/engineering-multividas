import path from 'path'
import { Feed } from 'feed'
import { writeFileSync } from 'fs';
import { createContentLoader, type SiteConfig } from 'vitepress'

const baseUrl = `https://engineering.multividas.com`

export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'Multividas Engineering blog',
    description: 'Creative engineers and developers building a world where you can belong anywhere',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: 'https://developers.multividas.com/images/logo.svg',
    favicon: `https://developers.multividas.com/images/logo.svg`,
    copyright: 'Copyright © 2023-present Soulaimane Yahya and blog contributors'
  })

  const posts = await createContentLoader('posts/*.md', {
    excerpt: true,
    render: true
  }).load()

  posts.sort(
    (a, b) =>
      +new Date(b.frontmatter.date as string) -
      +new Date(a.frontmatter.date as string)
  )

  for (const { url, excerpt, frontmatter, html } of posts) {
    feed.addItem({
      title: frontmatter.title,
      id: `${baseUrl}${url}`,
      link: `${baseUrl}${url}`,
      description: excerpt,
      content: html?.replaceAll('&ZeroWidthSpace;', ''),
      author: [
        {
          name: frontmatter.author,
          link: frontmatter.twitter ? `https://twitter.com/${frontmatter.twitter}` : undefined
        }
      ],
      date: frontmatter.date,
      image: frontmatter.image,
    })
  }

  writeFileSync(path.join(config.outDir!, 'feed.rss'), feed.rss2());
}
