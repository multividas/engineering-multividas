import { SitemapStream, streamToPromise } from 'sitemap'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const postsDirectory = path.join(__dirname, 'posts')

function getPostLinks() {
  const files = fs.readdirSync(postsDirectory)
  return files.map((file) => ({
    url: `http://localhost:5173/posts/${path.basename(file, '.md')}`,
    changefreq: 'weekly',
    priority: 0.5
  }))
}

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0 },
  ...getPostLinks()
]

async function generateSitemap() {
  const sitemap = new SitemapStream({
    hostname: 'https://engineering.multividas.com'
  })
  links.forEach((link) => sitemap.write(link))
  sitemap.end()

  const sitemapOutput = await streamToPromise(sitemap).then((data) =>
    data.toString()
  )
  fs.writeFileSync('sitemap.xml', sitemapOutput)
  console.log('Sitemap generated and saved to sitemap.xml')
}

generateSitemap()
