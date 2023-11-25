<template>
  <div class="d-flex flex-column min-vh-100">
    <header class="app-header sticky-top">
      <NavbarLayout></NavbarLayout>
    </header>
    <div class="app-container">
      <div class="col-md-12">
        <slot />
      </div>
    </div>
    <footer class="app-footer">
      <FooterLayout></FooterLayout>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style scoped>
</style>
