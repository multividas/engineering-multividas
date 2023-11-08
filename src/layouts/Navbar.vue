<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm px-md-0 px-sm-3 py-md-2 py-sm-3">
    <div class="container-fluid md:row d-md-flex justify-content-between px-md-5">
      <div class="d-flex justify-content-start align-items-center gap-2">
        <g-image alt="logo" src="~/assets/png/nav-logo.png" width="35" />
        <strong>
          <g-link to="/" class="navbar-brand text-primary fw-bold fs-4">Engineering blog</g-link>
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
