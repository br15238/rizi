<script setup lang="ts">
import { useHead, useRuntimeConfig } from '#imports'

const { app: { baseURL } } = useRuntimeConfig()

useHead({
  link: [
    { rel: 'preload', as: 'image', href: `${baseURL}img/banner/coffee-phone.webp`, fetchpriority: 'high' }
  ]
})
</script>

<template>
  <IndexCarousel />
  <div class="contentWrap mb-0">
    <IndexNews />
    <LazyIndexMenu />
    <LazyIndexStore />
  </div>
  <LazyIndexConcept />
  <div class="contentWrap">
    <LazyIndexInfo />
  </div>
</template>
