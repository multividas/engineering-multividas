// main
import MainLayout from '~/layouts/Main.vue'
// footer
import FooterLayout from '~/layouts/Footer.vue'
// Navbar
import NavbarLayout from '~/layouts/Navbar.vue'

export default function (Vue, { router, head, isClient }) {
  // Set Navbar Navbar as a global component
  Vue.component('Navbar', NavbarLayout)
  // Set Footer Footer as a global component
  Vue.component('Footer', FooterLayout)
  // Set Main Main as a global component
  Vue.component('Main', MainLayout)

  head.link.push({
    rel: 'shortcut icon',
    href: 'https://static-assets.multividas.com/assets/images/icon/icon.svg'
  }, {
    rel: 'stylesheet',
    href: 'https://res.cloudinary.com/db1e0b4ka/raw/upload/v1698339335/mv-scss/main.css'
  }, {
    rel: 'stylesheet',
    href: 'http://res.cloudinary.com/db1e0b4ka/raw/upload/v1700411908/mv-scss/footer.css'
  })
}
