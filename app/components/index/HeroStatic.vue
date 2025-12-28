<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const { app: { baseURL } } = useRuntimeConfig()
</script>

<template>
  <section class="mt-[2%] aspect-[1280/533]">
    <img
      :img="`${baseURL}img/banner/coffee-phone.webp`"
      alt="coffee"
      fetchpriority="high"
      loading="eager"
      width="1280"
      height="533"
      class="w-full h-auto"
    >
  </section>
</template>
