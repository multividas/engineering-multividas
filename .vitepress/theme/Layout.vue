<script setup lang="ts">
import Home from './Home.vue'
import { useData } from 'vitepress'
import Article from './Article.vue'
import NotFound from './NotFound.vue'

const { page, frontmatter } = useData()
</script>

<template>
  <div class="antialiased dark:bg-slate-900 min-h-screen">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <nav class="flex justify-between items-center py-10 font-bold">
        <a class="text-xl" href="/" aria-label="Multividas Engineering blog">
          <img class="inline-block mr-2" style="width: 36px; height: 31px" alt="logo"
            src="/logo-multividas-blogging-platform-multividas-social-media-blog-multividas-posts-threads-multividas-comments-discussions-multividas-short-texts-multividas-social-blogging.svg" />
          <span v-if="!frontmatter.index" class="hidden md:inline dark:text-white">Multividas Engineering blog</span>
        </a>
        <div class="text-sm text-gray-500 dark:text-white leading-5">
          <a class="hover:text-gray-700 dark:hover:text-gray-200" href="https://github.com/multividas/engineering-multividas" target="_blank"
            rel="noopener">
            <span class="hidden sm:inline">GitHub </span>Source
          </a>
          <span class="mr-2 ml-2">·</span>
          <a class="hover:text-gray-700 dark:hover:text-gray-200" href="/feed.rss" download="feed.rss">RSS<span class="hidden sm:inline"> Feed</span>
          </a>
          <span class="mr-2 ml-2">·</span>
          <a class="hover:text-gray-700 dark:hover:text-gray-200" href="https://multividas.com/" target="_blank"
            rel="noopener">Multividas.com →
          </a>
        </div>
      </nav>
    </div>
    <main class="max-w-3xl mx-auto px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <Home v-if="frontmatter.index" />
      <NotFound v-else-if="page.isNotFound" />
      <Article v-else />
    </main>
  </div>
</template>
