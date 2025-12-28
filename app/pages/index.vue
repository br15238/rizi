<script setup lang="ts">
const IndexMenu = defineAsyncComponent(() =>
  import('@/components/index/Menu.vue')
)
const IndexStore = defineAsyncComponent(() =>
  import('@/components/index/Store.vue')
)
const IndexConcept = defineAsyncComponent(() =>
  import('@/components/index/Concept.vue')
)
const IndexInfo = defineAsyncComponent(() =>
  import('@/components/index/Info.vue')
)

import { defineAsyncComponent } from 'vue'
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
</script>

<template>
  <div class="relative aspect-[1280/533]">
    <!-- LCP 首圖 -->
    <HeroStatic v-if="!showSlider" img="/img/banner/coffee-phone.webp" class="absolute inset-0" />

    <!-- 互動 slider（延後） -->
    <ClientOnly>
      <LazyHomeSlider v-if="showSlider" class="absolute inset-0" />
    </ClientOnly>
  </div>
  <div class="contentWrap mb-0">
    <IndexNews />
    <IndexMenu />
    <IndexStore />
  </div>
  <IndexConcept />
  <div class="contentWrap">
    <IndexInfo />
  </div>
</template>
