<!-- <script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const IndexMenu = defineAsyncComponent(() =>
  import('@/components/index/menu.vue')
)
const IndexStore = defineAsyncComponent(() =>
  import('@/components/index/store.vue')
)
const IndexConcept = defineAsyncComponent(() =>
  import('@/components/index/concept.vue')
)
const IndexInfo = defineAsyncComponent(() =>
  import('@/components/index/info.vue')
)
</script> -->

<template>
  <IndexCarousel />
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
