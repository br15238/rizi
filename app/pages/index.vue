<!-- <script setup lang="ts">
import { ref, onMounted } from 'vue'

const showSlider = ref(false)

onMounted(() => {
  const idle =
    window.requestIdleCallback ??
    ((cb: () => void) => setTimeout(cb, 200))

  idle(() => {
    showSlider.value = true
  })
})
</script> -->

<template>
  <IndexCarousel />
  <!-- <div class="relative aspect-[1280/533]">
    <IndexHeroStatic v-if="!showSlider" class="absolute inset-0" />
    <ClientOnly>
      <LazyIndexCarousel v-if="showSlider" class="absolute inset-0" />
    </ClientOnly>
  </div> -->
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
