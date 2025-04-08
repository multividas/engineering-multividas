import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { SitemapStream, streamToPromise } from 'sitemap'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const postsDirectory = path.join(__dirname, '..', 'posts')
const sitemapFile = path.join(__dirname, '..', 'public', 'sitemap.xml')

const hostname = 'https://engineering.multividas.com'

function getPostLinks() {
  return fs.readdirSync(postsDirectory)
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      url: `/posts/${path.basename(file, '.md')}`,
      changefreq: 'weekly',
      priority: 0.5
    }))
}

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname })
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
    ...getPostLinks()
  ]

  links.forEach(link => sitemap.write(link))
  sitemap.end()

  const sitemapOutput = await streamToPromise(sitemap).then(data => data.toString())
  fs.writeFileSync(sitemapFile, sitemapOutput, 'utf8')
  console.log(`Sitemap successfully generated at: ${sitemapFile}`)
}

generateSitemap().catch(error => {
  console.error('Error generating sitemap:', error)
})
