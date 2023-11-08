<template>
  <div class="d-flex flex-column min-vh-100">
    <header class="app-header sticky-top">
      <Navbar></Navbar>
    </header>
    <div class="app-container">
      <div class="col-md-12">
        <slot />
      </div>
    </div>
    <footer class="app-footer">
      <Footer></Footer>
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
