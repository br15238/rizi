<script setup lang="ts">
defineProps<{
    img: string
    alt?: string
}>()
</script>

<template>
  <section class="mt-[2%] aspect-[1280/533]">
    <img
      :src="img"
      :alt="alt || 'Banner'"
      fetchpriority="high"
      loading="eager"
      width="1280"
      height="533"
      class="w-full h-auto"
    >
  </section>
</template>
