import path from 'path'
import { Feed } from 'feed'
import { createContentLoader, type SiteConfig } from 'vitepress'
import fsExtra from 'fs-extra'
const baseUrl = `https://engineering.multividas.com`

const { ensureDirSync, writeFileSync } = fsExtra
export async function genFeed(config: SiteConfig) {
  const feed = new Feed({
    title: 'Multividas Engineering blog',
    description:
      'Creative engineers and developers building a world where you can belong anywhere, Multividas Engineering blog is a technical news resource for engineers interested in how we solve large-scale technical challenges at Multividas.',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: 'https://developers.multividas.com/images/logo.svg',
    favicon: `https://developers.multividas.com/images/logo.svg`,
    copyright: `Copyright © ${new Date().getFullYear()}-present Soulaimane Yahya`
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
          link: frontmatter.twitter
            ? `https://twitter.com/${frontmatter.twitter}`
            : undefined
        }
      ],
      date: new Date(frontmatter.date),
      image: frontmatter.image
    })
  }

  ensureDirSync(config.outDir!)
  writeFileSync(path.join(config.outDir!, 'feed.rss'), feed.rss2())
  writeFileSync(path.join(config.outDir!, 'feed.json'), feed.json1())
  writeFileSync(path.join(config.outDir!, 'feed.atom'), feed.atom1())
}
