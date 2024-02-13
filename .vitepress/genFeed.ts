import path from 'path'
import { Feed } from 'feed'
import { writeFileSync, mkdirSync } from 'fs';
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

    // Ensure the existence of the 'public' directory
    const publicDir = path.join(config.outDir!, 'public');
    if (!exists(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // Write the RSS feed to file
    writeFileSync(path.join(publicDir, 'feed.rss'), feed.rss2());
}

// Helper function to check if a directory exists
function exists(dir: string): boolean {
  try {
    return require('fs').statSync(dir).isDirectory();
  } catch (error) {
    return false;
  }
}
