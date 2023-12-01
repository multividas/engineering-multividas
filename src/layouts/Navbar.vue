<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm px-md-0 px-sm-3 py-md-2 py-sm-3">
    <div class="container md:row d-md-flex justify-content-between px-md-5">
      <div class="d-flex justify-content-start align-items-center gap-2">
        <g-image alt="multividas, multividas api documentation, multividas threads, multividas status, multividas help center, multividas developer, multividas about us, multividas ads, multividas engineering blog, multividas developers documentation, multividas embed threadsmultividas, multividas api documentation, multividas threads, multividas status, multividas help center, multividas developer, multividas about us, multividas ads, multividas engineering blog, multividas developers documentation, multividas embed threadsmultividas, multividas api documentation, multividas threads, multividas status, multividas help center, multividas developer, multividas about us, multividas ads, multividas engineering blog, multividas developers documentation, multividas embed threadsmultividas, multividas api documentation, multividas threads, multividas status, multividas help center, multividas developer, multividas about us, multividas ads, multividas engineering blog, multividas developers documentation, multividas" src="~/assets/png/nav-multividas-blogging-platform-multividas-social-media-blog-multividas-posts-threads-multividas-comments-discussions-multividas-short-texts-multividas-social-blogging.svg" width="32" />
        <strong>
          <g-link to="/" class="navbar-brand text-primary fw-bold fs-4">Engineering Blog</g-link>
        </strong>
      </div>
      <ul class="d-flex justify-content-end align-items-start gap-4">
        <li class="d-none d-md-block nav-item">
          <a class="btn btn-sm btn-light border fw-medium px-3 py-2 rounded-4" href="https://multividas.com/"
            target="_blank">
            Go to Multividas.com
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<static-query>
  query {
    metadata {
      siteName
    }
  }
</static-query>

<style scoped>
.nav-link {
  margin-top: 12px;
}
</style>
